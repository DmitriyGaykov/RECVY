create or replace trigger before_insert_trigger
before insert on users
for each row
execute function signuptrigger();

create or replace trigger after_insert_trigger
after insert on users
for each row
execute function setRoleTrigger();

create or replace function signUpTrigger()
returns trigger
as $$
begin
    new.password := tohash(new.password);
    return new;
end;
$$ language plpgsql;

create or replace function setRoleTrigger()
returns trigger
as $$
begin
    call setuserrole(new.id);
    return new;
end;
$$ language plpgsql;