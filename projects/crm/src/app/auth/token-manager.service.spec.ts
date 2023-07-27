import { LocalStorageTokenManager } from './token-manager.service';

describe('LocalStorageTokenManager', () => {
  it('should store token in localStorage', () => {
    const service = new LocalStorageTokenManager();

    service.storeToken('MOCK_TOKEN');

    expect(window.localStorage.getItem('authToken')).toBe('MOCK_TOKEN');
  });
});
