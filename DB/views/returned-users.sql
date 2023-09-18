CREATE OR REPLACE VIEW returned_users AS
SELECT
    users.id,
    users.firstname,
    users.lastname,
    users.aboutme,
    users.age,
    users.regdate,
    getphotosbyid(users.id) AS photos,
    getrolesof(users.id) AS role
FROM
    users;