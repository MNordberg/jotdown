# jotdown

Simple, searchable notes

## Use case

This feature is designed with the perspective of an Advocate in mind, who has multiple clients. As an Advocate, I can view and search notes for all my clients, or filter down to just one person.

Text search should work on note text or client name. Note input is limited 20-300 characters, per requirements.

## Considerations

#### This is the quick and dirty version.

While the basic structure is meant to be production-ready and scalable, it intentionally leaves out key considerations like:

- Security and user identification
- Modular architecture
- Robust UI theming

That being said, I think it's a pretty good showcase. Enjoy!

## How to run

- Clone
- Install packages (`npm install`)
- Configure database: update configuration in `server/src/data-source-config.ts` to match your sql server. The migration scripts will create a database called "jotdown" if it doesn't exist, so don't change the database name in the configuration.
- Migrate database: open terminal at `server` and run `npm run typeorm:migrate`
- Start server: open terminal at `server` and run `npm run start`
- Start client app: open terminal at `client` and run `npm run start`

## Live demo app

https://jotdown.z13.web.core.windows.net/
