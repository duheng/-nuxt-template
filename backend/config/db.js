const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config.json')[env];
const Sequelize = require('sequelize')
const setting = {
  host: config.host,
  dialect: 'mysql', // 数据库方言
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  define: {
    timestamps: false
  }
}

const sequelize =  new Sequelize(config.database, config.username, config.password, setting);

// 测试是否能连通，同步数据库

(async () => {
  try {
    await sequelize.authenticate();
    console.log("数据库连接成功");
    await sequelize.sync();
    console.log('数据库已同步');
  } catch (error) {
    console.error('数据库同步失败或未连接:', error);
  }
})();

module.exports = sequelize