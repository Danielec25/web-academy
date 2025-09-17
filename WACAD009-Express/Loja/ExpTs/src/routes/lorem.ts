    import { Router, Request, Response } from 'express';
    import { LoremIpsum } from 'lorem-ipsum';

    
    const router = Router();

    
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    });

    
    router.get('/lorem/:count', (req: Request, res: Response) => {
      
      const count = Number(req.params.count) || 1;

      
      const paragraphs = lorem.generateParagraphs(count);

      
      res.send(paragraphs.split('\n').map(p => `<p>${p}</p>`).join('\n'));
    });

    
    export default router;
    
