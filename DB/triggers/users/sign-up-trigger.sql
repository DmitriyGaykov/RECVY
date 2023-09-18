create or replace function signUpTrigger()
returns trigger
as $$
begin
    new.password := tohash(new.password);

    call setuserrole(new.id);

    return new;
end;
$$ language plpgsql;