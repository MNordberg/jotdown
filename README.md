# jotdown

Simple, searchable notes

#### This is the quick and dirty version.

While the basic structure is meant to be production-ready and scalable, it intentionally leaves out key considerations like:

- Security and user identification
- Modular architecture
- Robust UI theming

That being said, I think it's a pretty good showcase. Enjoy!

## How to run

- Clone
- Install packages (`npm install`)
- Configure database: update configuration in `server/src/data-source-config.ts` to match your sql database. Create a new database
- Migrate database: open terminal at `server` and run `typeorm:migrate`
- Start server: open terminal at `server` and run `npm run start`
- Start client app: open terminal at `client` and run `npm run start`

## Live demo app
