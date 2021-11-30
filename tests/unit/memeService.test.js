import Filter from 'bad-words';

import * as memeRepository from '../../src/repository/memeRepository.js';
import * as userRepository from '../../src/repository/userRepository.js';
import * as memeService from '../../src/services/memeService.js';

jest.mock('bad-words');
const sut = memeService;

describe('Meme service', () => {
    
    it('Limit < 0 Should return: No memes today!', async () => {
        const result = await sut.listMemes(0);
        expect(result.message).toBe('No memes today!');
    });

    it('Limit = undefined should return the given array', async () => {
        jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => ['test'])
        const result = await sut.listMemes();
        expect(result.data).toEqual(['test']);
    });

    it('Limit = undefined should return empty array', async () => {
        jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => [])
        const result = await sut.listMemes();
        expect(result.data).toEqual([]);
    });

    it('Limit > 0 but no memes should return: No memes today!', async () => {
        jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => [])
        const result = await sut.listMemes(1);
        expect(result.message).toBe('No memes today!');
    });

    it('Limit > 0 with memes on db should return the memes', async () => {
        jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => ['meme1', 'meme2'])
        const result = await sut.listMemes(2);
        expect(result.data).toEqual(['meme1', 'meme2']);
    });

    it('Should return: No user!', async () => {
        jest.spyOn(userRepository, 'findUserByTokenSession').mockImplementationOnce(() => [])
        const result = await sut.insertMeme('token', 'url', 'text');
        expect(result.message).toBe('No user!');
    });

    it('Should return the filtered text', async () => {
        jest.spyOn(userRepository, 'findUserByTokenSession').mockImplementationOnce(() => [1])
        jest.spyOn(memeRepository, 'insertMeme').mockImplementationOnce(() => 'you are an *******')
        const result = await sut.insertMeme('token', 'url', 'you are an asshole');
        expect(result.data).toBe('you are an *******');
    });

});