app.post('/dash_post', (req, res) => {

  const post_id = req.body.post_id;

  let sql;
  let params

  if (post_id == undefined) {
    sql = 'SELECT * FROM `posts` as po  LEFT JOIN post_files as pf on po.id = pf.post_id LEFT JOIN awt_register as ar on po.user_id = ar.id LEFT JOIN ( SELECT post_id as p_id, COUNT(*) AS like_count FROM `awt_post_likes` GROUP BY post_id ) AS like_counts ON po.id = like_counts.p_id WHERE po.deleted = 0 AND pf.post IS NOT NULL ORDER BY pf.post_id DESC LIMIT 5 ';

  } else {
    sql = 'SELECT * FROM `posts` as po  LEFT JOIN post_files as pf on po.id = pf.post_id LEFT JOIN awt_register as ar on po.user_id = ar.id LEFT JOIN ( SELECT post_id as p_id, COUNT(*) AS like_count FROM `awt_post_likes` GROUP BY post_id ) AS like_counts ON po.id = like_counts.p_id WHERE po.deleted = 0 AND  pf.post IS NOT NULL AND po.id < ?  ORDER BY pf.post_id DESC LIMIT 5';
    params = [post_id]
  }

  con.query(sql, params, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      let lastPostId = null;
      if (data.length > 0) {
        lastPostId = data[data.length - 1].post_id;
      }
      const result = mergeDataWithSamePostId(data);
      return res.json({ result, lastPostId });

    }
  });
});
