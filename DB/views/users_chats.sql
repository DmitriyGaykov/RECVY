create drop view users_chats as
    select distinct
        iduserfrom,
        iduserto
    from
        messages;

select * from users_chats;