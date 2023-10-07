create or replace function hasUserWithId(_id varchar(50))
returns boolean
as $$
declare
    count integer;
begin
    count := (
    select
        count(*)
    from
        users
    where
        id = _id
    );

    return count != 0;
end;
$$ language plpgsql;

select hasUserWithId('lTr4V5hgLwEs1xXPjEEi7MH19iCyu7t2ZpoYCtht27BN1PGX4');