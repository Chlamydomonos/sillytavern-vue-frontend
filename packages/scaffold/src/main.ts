import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';

const templatePath = path.resolve(__dirname, '..', 'template');

/**
 * 检查文件夹是否存在且不为空
 */
function isFolderExistsAndNotEmpty(folderPath: string): boolean {
    if (!fs.existsSync(folderPath)) {
        return false;
    }

    const stats = fs.statSync(folderPath);
    if (!stats.isDirectory()) {
        return true; // 文件存在但不是文件夹，视为有内容
    }

    const files = fs.readdirSync(folderPath);
    return files.length > 0;
}

/**
 * 递归复制文件夹及其内容
 */
function copyFolder(src: string, dest: string): void {
    // 确保目标文件夹存在
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);

    for (const item of items) {
        const srcPath = path.join(src, item);
        const stats = fs.statSync(srcPath);

        // 跳过 .gitignore 文件，因为我们会用 gitignore.template 来替代
        if (item === '.gitignore') {
            continue;
        }

        let destPath = path.join(dest, item);

        // 如果是 gitignore.template 文件，重命名为 .gitignore
        if (item === 'gitignore.template') {
            destPath = path.join(dest, '.gitignore');
        }

        if (stats.isDirectory()) {
            copyFolder(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

/**
 * 主函数
 */
async function main(): Promise<void> {
    try {
        // 用户输入项目文件夹
        const { projectFolder } = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectFolder',
                message: '请输入项目文件夹名称:',
                validate: (input: string) => {
                    if (!input.trim()) {
                        return '项目文件夹名称不能为空';
                    }
                    return true;
                },
            },
        ]);

        const targetPath = path.resolve(process.cwd(), projectFolder.trim());

        // 检查文件夹是否已经存在且不为空
        if (isFolderExistsAndNotEmpty(targetPath)) {
            console.error(`错误: 文件夹 "${targetPath}" 已经存在且不为空。请选择其他名称或清空该文件夹。`);
            process.exit(1);
        }

        // 创建文件夹并复制模板文件
        console.log(`正在创建项目: ${targetPath}`);

        // 确保目标文件夹存在
        if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
        }

        // 复制模板文件
        console.log('正在复制模板文件...');
        copyFolder(templatePath, targetPath);

        console.log(`✅ 项目创建成功! 路径: ${targetPath}`);
        console.log('\n下一步:');
        console.log(`  cd ${projectFolder}`);
        console.log('  npm install');
        console.log('  npm run dev');
    } catch (error) {
        console.error('创建项目时发生错误:', error);
        process.exit(1);
    }
}

// 运行主函数
main();
