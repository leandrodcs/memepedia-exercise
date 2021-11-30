import Filter from 'bad-words';

import * as memeRepository from '../../src/repository/memeRepository.js';
import * as userRepository from '../../src/repository/userRepository.js';
import * as memeService from '../../src/services/memeService.js';

describe('Meme service', () => {
    
    it('Limit < 0 Should return: No memes today!', async () => {
        // jest.spyOn(secretService, 'isOdd').mockImplementationOnce(() => true)
        const result = await memeService.listMemes(0);
        console.log(result)
        expect(result.message).toBe('No memes today!');
    });

    it('Limit > 0 but no memes should return: No memes today!', async () => {
        jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => [])
        const result = await memeService.listMemes(1);
        console.log(result)
        expect(result.message).toBe('No memes today!');
    });

    it('Limit > 0 but no memes should return: No memes today!', async () => {
        jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => ['meme1', 'meme2'])
        const result = await memeService.listMemes(2);
        console.log(result)
        expect(result.data).toEqual(['meme1', 'meme2']);
    });

});