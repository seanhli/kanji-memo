# kanji-memo (or kanji life)

Visit the deployed site at:
https://seanhli.github.io/kanji-memo/

## APIs used in this project
- https://kanjiapi.dev/

## project mission
- a fun and interactive way to learn and review kanji and Japanese vocabulary

## working locally 
### prerequisites:
- you will need docker desktop installed. if you do not have it installed, follow instructions at https://www.docker.com/products/docker-desktop/

### steps:
- open docker desktop
- git clone the project into your local directory of choice
- cd into the newly created repository
- run the following command in terminal: docker compose up --build
- react server may take up to several minutes to start up. you should see a message in the docker logs indicating if the server has started
- access local version at https://localhost:3000

## looking ahead
- this was meant to be a front-end only project, but in the future, a back end may be added to track the following:
  - user stats across modes
  - ability for user to track kanji that they had difficulty with (this will influence how often that kanji appears in the question pool, etc.)
- addition of a challenge mode that blends all modes
