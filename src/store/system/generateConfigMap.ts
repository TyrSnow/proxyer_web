export default function generateConfigMap(configs: any[]): any {
  const configNameMap = {};
  configs.map(config => configNameMap[config.name] = config);
  
  return configNameMap;
}
