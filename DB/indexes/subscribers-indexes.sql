create index subscribers_subscriber_idx on subscribers (subscriber) tablespace indextablespace;
create index subscribers_subscribeto_idx on subscribers (subscribeto) tablespace indextablespace;
create index subscribers_subscriber_subscribeto_idx on subscribers (subscriber, subscribeto) tablespace indextablespace;
