exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('wrestlers').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('wrestlers').insert({
          name: 'Macho Man Randy Savage',
          finishing_move: 'Top Rope Elbow Drop',
          catch_phrase: 'Ooh Yeah'
        }),
        knex('wrestlers').insert({
          name: 'The Rock',
          finishing_move: 'Rock Bottom',
          catch_phrase: 'If you smell what The Rock is cookin\''
        }),
        knex('wrestlers').insert({
          name: 'Stone Cold Steve Austin',
          finishing_move: 'Stone Cold Stunner',
          catch_phrase: 'Austin 3:16 says I just whooped your ass'
        })
      ]);
    });
};
