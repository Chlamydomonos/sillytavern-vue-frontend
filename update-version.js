// #!/bin/node

const fs = require('fs');
const path = require('path');

// 获取命令行参数中的新版本号
const newVersion = process.argv[2];

if (!newVersion) {
    console.error('请提供一个版本号作为命令行参数！');
    process.exit(1);
}

// 项目根目录
const rootDir = path.resolve(__dirname);
const workspaceDir = path.join(rootDir, 'packages');

// 需要更新的 package.json 文件路径
const packageJsonPaths = [
    path.join(rootDir, 'package.json'),
    path.join(workspaceDir, 'extension', 'package.json'),
    path.join(workspaceDir, 'frontend-event-emitter', 'package.json'),
    path.join(workspaceDir, 'project-helper', 'package.json'),
    path.join(workspaceDir, 'rollup-plugin', 'package.json'),
    path.join(workspaceDir, 'manifest.json'),
];

// 用正则表达式更新每个 package.json 的 version 字段
packageJsonPaths.forEach((filePath) => {
    if (fs.existsSync(filePath)) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            // 匹配 "version": "旧版本号"
            const updatedContent = content.replace(/("version"\s*:\s*")(\d+\.\d+\.\d+)(")/, `$1${newVersion}$3`);
            if (updatedContent !== content) {
                fs.writeFileSync(filePath, updatedContent, 'utf-8');
                console.log(`已更新 ${filePath} 的版本号为 ${newVersion}`);
            } else {
                console.warn(`文件 ${filePath} 的版本号未更新，可能未匹配到 version 字段。`);
            }
        } catch (err) {
            console.error(`更新文件 ${filePath} 时出错:`, err.message);
        }
    } else {
        console.warn(`文件 ${filePath} 不存在，跳过。`);
    }
});

console.log('所有版本号更新完成！');
