const express = require('express');
const { marked } = require('marked');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  const readmePath = path.join(__dirname, 'README.md');
  const readme = fs.readFileSync(readmePath, 'utf-8');
  const html = marked(readme);
  
  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Framework - Documentation</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
          line-height: 1.6;
          color: #333;
          background: #f5f5f5;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
          color: #2563eb;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 10px;
        }
        h2 {
          color: #1e40af;
          margin-top: 30px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 5px;
        }
        h3 {
          color: #1e3a8a;
        }
        code {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.9em;
        }
        pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 16px;
          border-radius: 6px;
          overflow-x: auto;
        }
        pre code {
          background: none;
          color: inherit;
          padding: 0;
        }
        a {
          color: #2563eb;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        .note {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 12px 16px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .warning {
          background: #fef2f2;
          border-left: 4px solid #ef4444;
          padding: 12px 16px;
          margin: 20px 0;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="warning">
          <strong>⚠️ Важно:</strong> Этот проект использует Docker и предназначен для локального запуска.
          Replit не поддерживает Docker, поэтому для запуска проекта вам нужно:
          <ol>
            <li>Скачать проект на локальный компьютер</li>
            <li>Установить Docker и Docker Compose</li>
            <li>Запустить командой <code>docker-compose up --build</code></li>
          </ol>
        </div>
        ${html}
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Documentation server running on http://0.0.0.0:${PORT}`);
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  📚 APPLICATION FRAMEWORK - DOCUMENTATION');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('  ⚠️  IMPORTANT: This is a Docker-based project');
  console.log('');
  console.log('  This project is designed to run locally with Docker.');
  console.log('  Replit does not support Docker containers.');
  console.log('');
  console.log('  To use this project:');
  console.log('  1. Download the project to your local machine');
  console.log('  2. Install Docker and Docker Compose');
  console.log('  3. Run: docker-compose up --build');
  console.log('');
  console.log('  📖 View documentation at: http://localhost:${PORT}');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
});
