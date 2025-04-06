#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the main.js file
import {Renderer} from './main.mjs';

// Get the current directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the index.html file
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Extract cell size using regex
const cellSizeMatch = htmlContent.match(/data-cell-size="(\d+)"/);
const cellSize = cellSizeMatch ? parseInt(cellSizeMatch[1]) : 60;

// Find the indentation of the line containing <!-- begin board -->
const beginBoardMatch = htmlContent.match(/^(\s*)<!-- begin board -->/m);
const indentation = beginBoardMatch ? beginBoardMatch[1] : '';

const notice = `<!-- This was baked by ./bake.mjs -->`;
// Generate the board content
const boardContent = Renderer.CreateBoard(cellSize, indentation);

// Replace the content between the board comments
htmlContent = htmlContent.replace(
    /<!-- begin board -->[\s\S]*?<!-- end board -->/,
    `<!-- begin board -->\n${indentation}${notice}\n${boardContent}\n${indentation}<!-- end board -->`
);

// Write the updated content back to the file
fs.writeFileSync(htmlPath, htmlContent, 'utf8');

console.log('Board content has been updated successfully!');
