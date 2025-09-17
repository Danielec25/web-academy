"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lorem_ipsum_1 = require("lorem-ipsum");
const router = (0, express_1.Router)();
const lorem = new lorem_ipsum_1.LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});
router.get('/lorem/:count', (req, res) => {
    const count = Number(req.params.count) || 1;
    const paragraphs = lorem.generateParagraphs(count);
    res.send(paragraphs.split('\n').map(p => `<p>${p}</p>`).join('\n'));
});
exports.default = router;
