/* eslint-disable */
'use strict';

// Генератор файлов блока

// Использование: node addBlock.js [имя блока]

const fs = require('fs');

const dirPath = 'src/scss/_blocks/';

const blockName = process.argv[2];

// Если есть имя блока
if (blockName) {
	

	const filePath = `${dirPath}_${blockName}.scss` // полный путь к создаваемому файлу
	let fileContent = `.${blockName} {
		
}`.trim();                                   // будущий контент файла

	
	if (fileExist(filePath) === false) {
		fs.writeFile(filePath, fileContent, (err) => {
			if (err) {
				return console.log(`[itome] Файл НЕ создан: ${err}`);
			}
			const newImport = `\n@import "_blocks/${blockName}";\n`;
			fs.appendFile('src/scss/main.scss', newImport, function (err) {
				if (err) {
					console.log(`[itome] Произошла ошибка: ${err}`);
				} else {
					console.log(`[itome] Файл создан: ${filePath}`);
				}
			  })
			  
			
			

		});
	}
	else  {
		console.log(`[itome] Файл НЕ создан: ${filePath} (уже существует)`);
	}
	

} else {
	console.log('Отмена операции: не указан блок');
}




function fileExist(path) {
	const fs = require('fs');
	try {
		fs.statSync(path);
	} catch (err) {
		return !(err && err.code === 'ENOENT');
	}
}