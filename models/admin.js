const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database_connection_uri'); // ใส่ URI การเชื่อมต่อฐานข้อมูลของคุณที่นี่

const Admin = sequelize.define('admin', {
  admin_id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  name_admin: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  account_id: {
    type: DataTypes.STRING(10),
    references: {
      model: 'accounts', // ชื่อตารางของ account
      key: 'account_id', // คีย์ที่ถูกอ้างอิง
    },
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: (admin, options) => {
      // สร้าง admin_id แบบสุ่ม
      admin.admin_id = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // สร้างตัวเลขสุ่ม 10 หลัก
    }
  },
  freezeTableName: true, // ป้องกัน Sequelize จากการเปลี่ยนชื่อตารางให้เป็นพหูพจน์
  timestamps: true // หากต้องการ `createdAt` และ `updatedAt`
});

// สร้างตารางตามโมเดลหากยังไม่มี
sequelize.sync()
  .then(() => console.log('Table `admin` has been created successfully.'))
  .catch(error => console.error('This error occurred', error));
