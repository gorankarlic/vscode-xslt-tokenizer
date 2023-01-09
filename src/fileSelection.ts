import * as vscode from 'vscode';
import * as path from 'path';


export class FileSelection {
  private fileList = new Map<string, string[]>();
  private static readonly PICK_FILE = "Pick File";
  private static readonly CLEAR_RECENTS = "Pick File - Refresh";
  private static commandList: string[] = [FileSelection.PICK_FILE];
  public pickedValues = new Map<string, string>();

  public async pickXsltFile() {
    return await this.pickFile({ label: "Select XSLT File", extensions: ["xsl", "xslt"] });
  }
  public async pickXmlSourceFile() {
    return await this.pickFile({ label: "Select XML Source File", extensions: ["xml", "html", "xhtml", "svg", "dcp", "xspec", "sch", "docbook", "dita", "ditamap", "xsd", "xbrl"] });
  }

  public async pickResultFile() {
    return await this.pickFile({ label: "Set Result File", extensions: ["xml", "html"], isResult: true });
  }

  public async pickFile(obj: { label: string; extensions?: string[]; isResult?: boolean }) {
    const { label, extensions, isResult } = obj;
    let fileListForLabel = this.fileList.get(label);
    if (!fileListForLabel) {
      fileListForLabel = [];
      this.fileList.set(label, fileListForLabel);
    }
    const fileItems = fileListForLabel.map(fsPath => ({ label: path.basename(fsPath), description: path.dirname(fsPath) }));
    const commandItems: { label: string; description?: string}[] = FileSelection.commandList.map(label => ({ label }));
    if (fileListForLabel.length > 0) {
      commandItems.push({ label: FileSelection.CLEAR_RECENTS, description: 'refresh recently used list' });
    }
    const OtherSeparator = {
      label: 'file explorer',
      kind: vscode.QuickPickItemKind.Separator
    };
    const fileSeparator = {
      label: 'recently used',
      kind: vscode.QuickPickItemKind.Separator
    };
    const currentSeparator = {
      label: 'current file',
      kind: vscode.QuickPickItemKind.Separator
    };

    let listItems: { label: string; kind?: vscode.QuickPickItemKind; description?: string }[] = [];
    let currentFilePath = vscode.window.activeTextEditor?.document.uri.fsPath;

    if (isResult) {
      currentFilePath = undefined;
    } else if (currentFilePath) {
      if (!extensions || extensions.includes('*') || extensions.includes(path.extname(currentFilePath).substring(1))) {
        listItems.push(currentSeparator);
        listItems.push({ label: path.basename(currentFilePath), description: path.dirname(currentFilePath) });
      } else {
        currentFilePath = undefined;
      }
    }
    if (fileItems.length > 0) {
      listItems.push(fileSeparator);
      listItems = listItems.concat(fileItems);
    }
    listItems.push(OtherSeparator);
    listItems = listItems.concat(commandItems);
    const qpOptions: vscode.QuickPickOptions = {
      placeHolder: label
    };
    if (fileItems.length > 0 || currentFilePath) {
      // give option to select from recent files
      const picked = await vscode.window.showQuickPick(listItems, qpOptions);
      let exit = true;
      if (picked) {
        if (picked.kind === vscode.QuickPickItemKind.Separator) {
        } else if (picked.label === FileSelection.PICK_FILE) {
          exit = false;
        } else if (picked.label === FileSelection.CLEAR_RECENTS) {
          fileListForLabel.length = 0;
          exit = false;
        } else {
          const pickedFsPath = picked.description + path.sep + picked.label;
          if (pickedFsPath === currentFilePath) {
            if (!fileListForLabel.includes(pickedFsPath)) {
              fileListForLabel.push(pickedFsPath);
            }
          }
          this.pickedValues.set(label, pickedFsPath);
          return pickedFsPath;
        }
      }
      if (exit) {
        return;
      }
    }
    if (isResult) {
      const RESULT_FILE = await vscode.window.showSaveDialog({
        title: label
      });
      if (RESULT_FILE) {
        const newFilePath = RESULT_FILE.fsPath;
        fileListForLabel.unshift(newFilePath);
        if (fileListForLabel.length > 10) {
          fileListForLabel.pop();
        }
        this.pickedValues.set(label, newFilePath);
        return newFilePath;
      }
    } else {
      let extensionFilters: { [key: string]: string[] } = {};
      if (extensions) {
        const filterLabel = extensions.map(ext => '*.' + ext).join(', ');
        extensionFilters[filterLabel] = extensions;
        extensionFilters['*.*'] = ['*'];
      }
      const APP_FILE = await vscode.window.showOpenDialog({
        title: label,
        filters: extensionFilters,
        canSelectFolders: false,
        canSelectFiles: true,
        canSelectMany: false,
        openLabel: label,
      });
  
      if (!APP_FILE || APP_FILE.length < 1) {
        return;
      } else {
        const newFilePath = APP_FILE[0].fsPath;
        fileListForLabel.unshift(newFilePath);
        if (fileListForLabel.length > 10) {
          fileListForLabel.pop();
        }
        this.pickedValues.set(label, newFilePath);
        return newFilePath;
      }
    }
  }
}