const { execSync } = require('child_process');
const fs = require('fs');

const ROOT = `${__dirname}/../../`;
const JAVA_ENUMS_DIRNAME = `${__dirname}/enums`; // 백엔드 common/enums 디렉터리를 임시로 카피해오세요
const ENUMS_DIRNAME = `${ROOT}/src/api/@types`;
const ENUMS_FILENAME = `${ENUMS_DIRNAME}/@enums.ts`;
const ENUMS_ABSOLUTE_PATH = `@/api/@types/@enums`;
const LABELS_DIRNAME = `${ROOT}/src/constants`;
const LABELS_FILENAME = `${LABELS_DIRNAME}/labels.ts`;

execute();

function execute() {
  const { enumNames, enums, labels } = fs.readdirSync(JAVA_ENUMS_DIRNAME).reduce(
    (acc, fileName) => {
      const content = fs.readFileSync(`${JAVA_ENUMS_DIRNAME}/${fileName}`, { encoding: 'utf8' });

      const enumNameRegex = /(?<=public enum )([A-Z]\w+)/;
      const enumName = enumNameRegex.exec(content)[1];

      const enumFieldsRegex = /(?<enumValue>[A-Z_]+)\("(?<enumLabel>.+)"\)/g;
      const enumFields = [...content.matchAll(enumFieldsRegex)].map(v => v.groups);

      const enumStr = `
export enum ${enumName} {
${enumFields.map(({ enumValue }) => `${enumValue} = '${enumValue}'`).join(',\n')}
}`.trim();

      const labelStr = `
export const ${pascalToScreamingSnakeCase(enumName)}_LABEL: Record<${enumName}, string> = {
${enumFields.map(({ enumValue, enumLabel }) => `[${enumName}.${enumValue}]: '${enumLabel}'`).join(',\n')}
};`.trim();

      acc.enumNames.push(enumName);
      acc.enums.push(enumStr);
      acc.labels.push(labelStr);
      return acc;
    },
    {
      enumNames: [],
      enums: [],
      labels: [],
    },
  );

  mkdir(ENUMS_DIRNAME);
  mkdir(LABELS_DIRNAME);

  const enumsImportPhrase = `import {${enumNames.join(',')}} from '${ENUMS_ABSOLUTE_PATH}';\n\n`;
  fs.writeFileSync(ENUMS_FILENAME, enums.join('\n\n'), { encoding: 'utf-8' });
  fs.writeFileSync(LABELS_FILENAME, enumsImportPhrase + labels.join('\n\n'), { encoding: 'utf-8' });

  execSync(`eslint ${ENUMS_FILENAME} --fix --quiet`);
  execSync(`eslint ${LABELS_FILENAME} --fix --quiet`);

  console.log('🛠️Enums & Labels generated.');
}

function mkdir(dirname) {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function pascalToScreamingSnakeCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}
