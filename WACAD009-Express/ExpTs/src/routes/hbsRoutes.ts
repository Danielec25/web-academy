import { Router, Request, Response } from 'express';

const router = Router();

// Rota para /hb1
router.get('/hb1', (req: Request, res: Response) => {
  res.render('hb1', { tecnologia: 'Express + HBS!' });
});

// Rota para /hb2
router.get('/hb2', (req: Request, res: Response) => {
  res.render('hb2');
});

// Rota para /hb3
router.get('/hb3', (req: Request, res: Response) => {
  const professores = [
    { nome: 'David Fernandes', sala: '1238' },
    { nome: 'Horácio Fernandes', sala: '1237' },
    { nome: 'Edleno Moura', sala: '1236' },
    { nome: 'Elaine Harada', sala: '1231' },
  ];
  res.render('hb3', { professores: professores });
});

// ROTA /hb4 CORRIGIDA
// A lógica agora está DENTRO da função (req, res) => { ... }
router.get('/hb4', (req: Request, res: Response) => {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];
  res.render('hb4', { technologies: technologies });
});

// ROTA /hb5 CORRIGIDA (para corresponder à imagem do exercício)
router.get('/hb5', (req: Request, res: Response) => {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];
  res.render('hb4', { technologies: technologies });
});

export default router;

