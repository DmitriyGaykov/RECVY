create or replace trigger before_insert_trigger
before insert on users
for each row
execute function signuptrigger();