import * as vscode from 'vscode';
import { FileGenerator } from './file-generator';

// This method is called when your extension is activated
export function activate(extension: vscode.ExtensionContext) {

	const fileGenerator = new FileGenerator(extension);
	const generateFileDisposable = vscode.commands.registerCommand('metapagekit.generateFile', (uri?: vscode.Uri) => fileGenerator.generateFile(uri));
	extension.subscriptions.push(generateFileDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
