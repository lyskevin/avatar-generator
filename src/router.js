import { Router } from 'express';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-gridy-sprites';

const router = Router();
let options = {height: 100, width: 100,};
let avatars = new Avatars(sprites, options);

router.get(
  '/',
  async (req, res) => {
    try {
      const seed = Math.random() * 1000000;
      var uniqueName = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        style: 'capital',
        separator: ' ',
        seed: seed,
      });
      var svg = avatars.create(seed);
      var responseBody =
      `<html>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div>
            ${svg}
          </div>
          <div>
            <p>${uniqueName}</p>
          </div>
          <form action="/" method="get">
            <button type="submit">
              Generate Another Avatar
            </button onclick=refresh()>
          </form>
        </div>
        <script>
          function refresh() {
            $.ajax({
              url: '/'
            });
          }
        </script>
      </html>`;
      res.status(200).header('Content-Type', 'text/html').send(responseBody);
    } catch (e) {
      console.log(e);
      res.status(500).send('The server encountered an error while trying to process the request.');
    }
  }
);

export default router;
