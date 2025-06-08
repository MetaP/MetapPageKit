import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class FileCreator {
    private readonly templateExtension = '.html';

    private readonly extension: vscode.ExtensionContext;

    // Path to the templates folder
    // This is the 'templates' subfolder within the extension
    private templatesPath?: string;
    
    // Array containing the template names
    // This will be populated with the names of the files with the specified templateExtension found in the templates folder
    private templates: string[] = [];

    constructor(extension: vscode.ExtensionContext) {
        this.extension = extension;
        this.templatesPath = this.getTemplatesPath(extension);
        if (this.templatesPath) {
            this.templates = this.getTemplates(this.templatesPath, this.templateExtension);
        }
    }

    private getTemplatesPath(extension: vscode.ExtensionContext): string | undefined {
        // Determine the path to the templates folder within the extension
        const templatesPath = path.join(extension.extensionPath, 'templates');

        if (fs.existsSync(templatesPath)) {
            return templatesPath;
        } else { // If the templates folder does not exist, show an error message
            vscode.window.showErrorMessage(`Templates folder not found. ('${templatesPath}')`, { modal: true });
            return undefined;
        }
    }

    private getTemplates(folder: string, extension: string): string[] {

        const templates = fs.readdirSync(folder)
            .filter(file => file.endsWith(extension))
            .map(file => path.basename(file, extension));

        if (templates.length === 0) {
            vscode.window.showErrorMessage(`No templates found in the templates folder. ('${folder}')`, { modal: true });
            return [];
        } else {
            return templates;
        }
    }

    /**
     * Adds a new HTML file to the workspace using a selected template.
     * Prompts the user to select a template and enter a file name.
     * Creates the file in the first workspace folder.
     */
    public async addFile() {
        const folders = vscode.workspace.workspaceFolders;
        if (!folders) {
            vscode.window.showErrorMessage('No workspace folder open.');
            return;
        }

        const template = await vscode.window.showQuickPick(this.templates, {
            placeHolder: 'Select a template to use'
        });

        if (!template || !this.templatesPath) {
            return;
        }

        const templatePath = path.join(this.templatesPath, template + this.templateExtension);

        const folderUri = folders[0].uri;
        const fileName = await vscode.window.showInputBox({
            prompt: 'Enter a name for the new file',
            value: 'index.html'
        });

        if (!fileName) {
            return;
        }

        const filePath = path.join(folderUri.fsPath, fileName);

        if (fs.existsSync(filePath)) {
            vscode.window.showErrorMessage('File already exists!');
            return;
        }

        const templateContents = fs.readFileSync(templatePath, 'utf8');
        fs.writeFileSync(filePath, templateContents, 'utf8');

        const doc = await vscode.workspace.openTextDocument(filePath);
        vscode.window.showTextDocument(doc);
    }
}