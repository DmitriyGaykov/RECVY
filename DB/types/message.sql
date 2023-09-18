create type TypeMessage as
(
    messageId varchar(256),
    idUserFrom varchar(50),
    idUserTo varchar(50),
    message varchar(3000),
    messageType varchar(20),
    isEdited boolean,
    sentDate timestamp
)