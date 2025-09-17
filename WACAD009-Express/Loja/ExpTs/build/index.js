"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
require("dotenv/config");
const logger_1 = __importDefault(require("./middleware/logger"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = require("express-handlebars");
const customHelpers = __importStar(require("./helpers/handlebars"));
const node_sass_middleware_1 = __importDefault(require("node-sass-middleware"));
const lorem_1 = __importDefault(require("./routes/lorem"));
const hbsRoutes_1 = __importDefault(require("./routes/hbsRoutes"));
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Configuração do Handlebars
app.engine('hbs', (0, express_handlebars_1.engine)({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path_1.default.join(__dirname, '../views/layouts'),
    helpers: customHelpers,
}));
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, '../views'));
// Configuração do SASS
app.use((0, node_sass_middleware_1.default)({
    src: path_1.default.join(__dirname, '../sass'),
    dest: path_1.default.join(__dirname, '../public/css'),
    outputStyle: 'compressed',
    prefix: '/css',
}));
// --- SERVIR FICHEIROS ESTÁTICOS ---
// Serve a nossa pasta 'public' (para o nosso styles.css)
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// CRIA UM CAMINHO VIRTUAL para os ficheiros do Bootstrap
// Qualquer pedido para /bootstrap será redirecionado para a pasta do bootstrap em node_modules
app.use('/bootstrap', express_1.default.static(path_1.default.join(__dirname, '../node_modules/bootstrap/dist')));
// ------------------------------------
app.use((0, logger_1.default)('completo'));
// Registo dos Routers
app.use('/', lorem_1.default);
app.use('/', hbsRoutes_1.default);
app.get('/', (req, res) => {
    res.render('home');
});
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}`);
});
