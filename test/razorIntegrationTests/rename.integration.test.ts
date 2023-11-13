/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as path from 'path';
import * as vscode from 'vscode';
import { describe, beforeAll, afterAll, test, expect } from '@jest/globals';
import testAssetWorkspace from './testAssets/testAssetWorkspace';
import * as integrationHelpers from '../integrationTests/integrationHelpers';

describe(`Razor Rename ${testAssetWorkspace.description}`, function () {
    beforeAll(async function () {
        if (!integrationHelpers.isRazorWorkspace(vscode.workspace)) {
            return;
        }

        await integrationHelpers.openFileInWorkspaceAsync(path.join('Pages', 'Counter.razor'));
        await integrationHelpers.activateCSharpExtension();
    });

    afterAll(async () => {
        await testAssetWorkspace.cleanupWorkspace();
    });

    test('Rename currentCount', async () => {
        if (!integrationHelpers.isRazorWorkspace(vscode.workspace)) {
            return;
        }

        const activeDocument = vscode.window.activeTextEditor?.document.uri;
        if (!activeDocument) {
            throw new Error('No active document');
        }

        const result = await vscode.commands.executeCommand(
            'vscode.executeDocumentRenameProvider',
            activeDocument,
            {
                line: 10,
                character: 17,
            },
            'count'
        );

        expect(result).toBeDefined();
    });
});
