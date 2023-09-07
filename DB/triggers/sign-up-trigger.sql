create or replace function signUpTrigger()
returns trigger
as $$
begin
    new.password := tohash(new.password);
    return new;
end;
$$ language plpgsql;