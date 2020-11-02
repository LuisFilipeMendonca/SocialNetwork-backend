'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('post_photos', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      postPhoto: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'post_photo'
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'post_id',
        references: {
          model: 'posts',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'updated_at'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post_photos');
  }
};
