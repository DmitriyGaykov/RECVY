create unique index idx_messageid on messages(messageid) tablespace indextablespace;
create index idx_iduserfrom on messages(iduserfrom) tablespace indextablespace;
create index idx_iduserto on messages(iduserto) tablespace indextablespace;
create index idx_iduserto_iduserfrom on messages(iduserto, iduserfrom) tablespace indextablespace;

drop index idx_messageid;
drop index idx_iduserfrom;
drop index idx_iduserto;
drop index idx_iduserto_iduserfrom;

explain analyse select * from getchats('81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22');

select * from usersroles where role = 'admin';
-- заполнить таблицу messages 100000 записями
-- напиши цикл

call fill();

create or replace procedure fill()
as $$
declare
  i int;
  _messageid text;
begin
    i := 1;
    while i <= 100000 loop
        select messageid into _messageid from sendMessage('0', '0', 'Hello mir ' || cast(i as text), 'text');
        i := i + 1;
    end loop;
end;
$$ language plpgsql;

