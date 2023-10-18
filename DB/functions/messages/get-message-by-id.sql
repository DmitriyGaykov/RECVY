create or replace function getMessageById(id varchar(255))
returns setof messages as $$
begin
    return query select * from messages where messageid = $1;
end;
$$ language plpgsql;

select * from getMessageById('')