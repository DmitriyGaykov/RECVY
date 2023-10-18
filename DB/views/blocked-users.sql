create or replace view blocked_users as
select
        returned_users.*,
        blockedusers.reason,
        blockedusers.blockeddate
    from
        blockedusers
    join
        returned_users
            on returned_users.id = blockedusers.userid;