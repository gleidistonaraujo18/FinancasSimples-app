import app from './src/server';
import { sequelize } from './src/config/database'

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados ou iniciar o servidor:', error);
        process.exit(1);
    }
};

startServer();