const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const Client = require('pg').Client;
chai.use(chaiHttp);

const app = require('../app.js');

describe('Health check', () => {
    it('Returns a 200 response', (done) => {
        chai.request(app)
            .get('/')
            .end((error, response) => {
                if (error) done(error);
                // Now let's check our response
                expect(response).to.have.status(200);
                done();
            });
    });
});

describe('Access to DB', function(){

        it('wrong credentials for connection', (done) => {
            var client = new Client({
                user: 'postgres',
                host: 'localhost',
                database: 'first_db',
                password: '123',
                port: 5432,
            });

            client.connect(function(err, res) {
                err = JSON.stringify(err);
                expect(err).to.include('auth_failed');
                if (err) {
                   // console.log( err);
                }

                client.end()
            })
            done();

        });

    it('right credentials for connection', (done) => {
        var client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'first_db',
            password: '123123123',
            port: 5432,
        });

        client.connect(function(err, res) {

            expect(res["connected"]).to.equal(true);

            if (err) {
                console.log(err);
            }
            client.end()
        })
        done();

    });

});

describe('DB query', function() {

    it('returns list of images', (done) => {
        var client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'first_db',
            password: '123',
            port: 5432,
        });

        client.connect();

        client.query('select i.img_src from public."Images"', (err, res) => {

            if (err) throw err
            expect(res[0]).to.include.keys("img_src");
            client.end()

        })
        done();

    });
})

