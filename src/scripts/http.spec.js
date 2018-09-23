require('jasmine-ajax');
import { Http } from './http';
import { testResponses } from '../../dummy-data/ajax-responses'

describe('http', () => {
    let openSpy;
    let sendSpy;

    beforeEach(() => {
        jasmine.Ajax.install();
        openSpy = spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
        sendSpy = spyOn(XMLHttpRequest.prototype, 'send');
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
        openSpy.calls.reset();
        sendSpy.calls.reset();
    })

    describe('get', () => {
        it('should send a GET request to the target URI', () => {
            const url = 'https://jsonplaceholder.typicode.com/users';
            Http.get(url);
            
            let request = jasmine.Ajax.requests.mostRecent();
            expect(request.method).toBe('GET');
            expect(request.url).toBe(url);
        });

        it('should return a promise that resolves to the returned data', (done) => {
            const url = 'https://jsonplaceholder.typicode.com/users'
            let result = Http.get('https://jsonplaceholder.typicode.com/users');
            expect(result).toEqual(jasmine.any(Promise));

            result.then(res => {
                expect(res).toEqual(JSON.parse(testResponses.users.success.responseText));
                done();
            });

            let request = jasmine.Ajax.requests.mostRecent();
            request.respondWith(testResponses.users.success);
        });

        it('should return a promise that rejects with an error if the req is unsuccessful', (done) => {
            const url = 'https://jsonplaceholder.typicode.com/users'
            let result = Http.get('https://jsonplaceholder.typicode.com/users');
            expect(result).toEqual(jasmine.any(Promise));

            result
                .then(res => {
                    fail('Promise did not reject');
                    done();
                })
                .catch(err => {
                    expect(err).toBeDefined();
                    done();
                })

            let request = jasmine.Ajax.requests.mostRecent();
            request.respondWith(testResponses.users.pagenotfound);
        });
    });
});