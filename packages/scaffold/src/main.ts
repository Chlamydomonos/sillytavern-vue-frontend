import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import { format } from 'prettier';

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
 * 设置TavernHelper类型定义文件
 */
async function setupTavernHelper(projectPath: string): Promise<void> {
    try {
        console.log('正在获取TavernHelper类型定义...');

        // 获取GitHub上的类型定义文件
        const url = 'https://github.com/N0VI028/JS-Slash-Runner/blob/main/dist/%40types.txt';
        const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob', '');

        const response = await fetch(rawUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const typesContent = await response.text();
        console.log('类型定义获取成功');

        // 包裹在namespace声明中
        const wrappedContent = `declare namespace TavernHelper {\n${typesContent}\n}`;

        // 使用prettier格式化
        console.log('正在格式化代码...');
        const formattedContent = await format(wrappedContent, {
            parser: 'typescript',
            semi: true,
            singleQuote: true,
            tabWidth: 4,
            trailingComma: 'es5',
        });

        // 确保src目录存在
        const srcDir = path.join(projectPath, 'src');
        if (!fs.existsSync(srcDir)) {
            fs.mkdirSync(srcDir, { recursive: true });
        }

        // 保存到指定文件
        const outputPath = path.join(srcDir, 'tavern-helper.d.ts');
        fs.writeFileSync(outputPath, formattedContent, 'utf8');

        console.log(`类型定义已保存到: ${outputPath}`);
        console.log('TavernHelper设置完成！');
    } catch (error) {
        console.error('设置TavernHelper时出错:', error);
        // 不退出进程，只是显示错误
    }
}

/**
 * 更新项目 package.json 中的依赖版本
 */
function updateProjectPackageJson(projectPath: string, scaffoldVersion: string): void {
    const projectPackageJsonPath = path.join(projectPath, 'package.json');

    if (!fs.existsSync(projectPackageJsonPath)) {
        console.warn('警告: 项目 package.json 文件不存在，跳过版本更新');
        return;
    }

    try {
        // 读取项目的 package.json
        const packageJsonContent = fs.readFileSync(projectPackageJsonPath, 'utf-8');
        const packageJson = JSON.parse(packageJsonContent);

        // 更新 @sillytavern-vue-frontend/project-helper 的版本
        const dependencyName = '@sillytavern-vue-frontend/project-helper';

        if (packageJson.dependencies && packageJson.dependencies[dependencyName]) {
            packageJson.dependencies[dependencyName] = `^${scaffoldVersion}`;
            console.log(`更新 ${dependencyName} 版本为: ^${scaffoldVersion}`);
        } else if (packageJson.devDependencies && packageJson.devDependencies[dependencyName]) {
            packageJson.devDependencies[dependencyName] = `^${scaffoldVersion}`;
            console.log(`更新 ${dependencyName} 版本为: ^${scaffoldVersion}`);
        } else {
            console.warn(`警告: 在 package.json 中未找到 ${dependencyName} 依赖`);
            return;
        }

        // 写回文件
        fs.writeFileSync(projectPackageJsonPath, JSON.stringify(packageJson, null, 4) + '\n');
    } catch (error) {
        console.error('更新 package.json 时发生错误:', error);
    }
}

/**
 * 主函数
 */
async function main(): Promise<void> {
    try {
        // 读取脚手架的版本信息
        const scaffoldPackageJsonPath = path.resolve(__dirname, '..', 'package.json');
        const scaffoldPackageJson = JSON.parse(fs.readFileSync(scaffoldPackageJsonPath, 'utf-8'));
        const scaffoldVersion = scaffoldPackageJson.version;

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

        // 更新项目 package.json 中的依赖版本
        console.log('正在更新依赖版本...');
        updateProjectPackageJson(targetPath, scaffoldVersion);

        // 设置TavernHelper类型定义
        console.log('正在设置TavernHelper类型定义...');
        await setupTavernHelper(targetPath);

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
