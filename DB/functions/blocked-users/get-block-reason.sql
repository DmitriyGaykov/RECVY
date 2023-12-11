create or replace function getBlockReason(_userid varchar(50))
returns text as $$
begin
    return (select reason from blockedusers where userid = _userid);
end;
$$ language plpgsql;


call unblockuser('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22');

select * from getBlockReason('12312');