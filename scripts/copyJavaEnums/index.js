const { execSync } = require('child_process');
const fs = require('fs');

const ROOT = `${__dirname}/../../`;
const JAVA_ENUMS_DIRNAME = `${__dirname}/enums`; // 백엔드 common/enums 디렉터리를 임시로 카피해오세요
const ENUMS_FILENAME = `${ROOT}/src/api/@types/@enums.ts`;

const execute = () => {
  const enums = fs.readdirSync(JAVA_ENUMS_DIRNAME).reduce((acc, fileName) => {
    const content = fs.readFileSync(`${JAVA_ENUMS_DIRNAME}/${fileName}`, { encoding: 'utf8' });

    const enumNameRegex = /(?<=public enum )([A-Z]\w+)/;
    const enumName = enumNameRegex.exec(content)[1];

    const enumFieldsRegex = /(?<enumValue>[A-Z_]+)\("(?<enumLabel>.+)"\)/g;
    const enumFields = [...content.matchAll(enumFieldsRegex)].map(v => v.groups);

    const enumStr =
      `
export enum ${enumName} {
${enumFields.map(({ enumValue }) => `${enumValue} = '${enumValue}'`).join(',\n')}
}`.trim() + '\n\n';

    acc.push(enumStr);
    return acc;
  }, []);

  fs.writeFileSync(ENUMS_FILENAME, enums.join('\n\n'), { encoding: 'utf-8' });

  execSync(`eslint ${ENUMS_FILENAME} --fix --quiet`);

  console.log('🛠️Enums generated.');
};

execute();
