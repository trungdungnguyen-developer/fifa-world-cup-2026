let teams = [
  { id: "mex", name: "Mexico", short: "MEX", flag: "mx", group: "A", played: 2, won: 2, drawn: 0, lost: 0, gf: 3, ga: 0, points: 6 },
  { id: "kor", name: "Hàn Quốc", short: "KOR", flag: "kr", group: "A", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 2, points: 3 },
  { id: "cze", name: "Czechia", short: "CZE", flag: "cz", group: "A", played: 2, won: 0, drawn: 1, lost: 1, gf: 2, ga: 3, points: 1 },
  { id: "rsa", name: "Nam Phi", short: "RSA", flag: "za", group: "A", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 3, points: 1 },
  { id: "can", name: "Canada", short: "CAN", flag: "ca", group: "B", played: 2, won: 1, drawn: 1, lost: 0, gf: 7, ga: 1, points: 4 },
  { id: "sui", name: "Thụy Sĩ", short: "SUI", flag: "ch", group: "B", played: 2, won: 1, drawn: 1, lost: 0, gf: 5, ga: 2, points: 4 },
  { id: "bih", name: "Bosnia và Herzegovina", short: "BIH", flag: "ba", group: "B", played: 2, won: 0, drawn: 1, lost: 1, gf: 2, ga: 5, points: 1 },
  { id: "qat", name: "Qatar", short: "QAT", flag: "qa", group: "B", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 7, points: 1 },
  { id: "bra", name: "Brazil", short: "BRA", flag: "br", group: "C", played: 2, won: 1, drawn: 1, lost: 0, gf: 4, ga: 1, points: 4 },
  { id: "mar", name: "Ma Rốc", short: "MAR", flag: "ma", group: "C", played: 2, won: 1, drawn: 1, lost: 0, gf: 2, ga: 1, points: 4 },
  { id: "sco", name: "Scotland", short: "SCO", flag: "gb-sct", group: "C", played: 2, won: 1, drawn: 0, lost: 1, gf: 1, ga: 1, points: 3 },
  { id: "hti", name: "Haiti", short: "HAI", flag: "ht", group: "C", played: 2, won: 0, drawn: 0, lost: 2, gf: 0, ga: 4, points: 0 },
  { id: "usa", name: "Hoa Kỳ", short: "USA", flag: "us", group: "D", played: 2, won: 2, drawn: 0, lost: 0, gf: 6, ga: 1, points: 6 },
  { id: "aus", name: "Australia", short: "AUS", flag: "au", group: "D", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 2, points: 3 },
  { id: "par", name: "Paraguay", short: "PAR", flag: "py", group: "D", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 4, points: 3 },
  { id: "tur", name: "Thổ Nhĩ Kỳ", short: "TUR", flag: "tr", group: "D", played: 2, won: 0, drawn: 0, lost: 2, gf: 0, ga: 3, points: 0 },
  { id: "ger", name: "Đức", short: "GER", flag: "de", group: "E", played: 2, won: 2, drawn: 0, lost: 0, gf: 9, ga: 2, points: 6 },
  { id: "civ", name: "Bờ Biển Ngà", short: "CIV", flag: "ci", group: "E", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 2, points: 3 },
  { id: "ecu", name: "Ecuador", short: "ECU", flag: "ec", group: "E", played: 2, won: 0, drawn: 1, lost: 1, gf: 0, ga: 1, points: 1 },
  { id: "cuw", name: "Curaçao", short: "CUW", flag: "cw", group: "E", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 7, points: 1 },
  { id: "ned", name: "Hà Lan", short: "NED", flag: "nl", group: "F", played: 2, won: 1, drawn: 1, lost: 0, gf: 7, ga: 3, points: 4 },
  { id: "jpn", name: "Nhật Bản", short: "JPN", flag: "jp", group: "F", played: 2, won: 1, drawn: 1, lost: 0, gf: 6, ga: 2, points: 4 },
  { id: "swe", name: "Thụy Điển", short: "SWE", flag: "se", group: "F", played: 2, won: 1, drawn: 0, lost: 1, gf: 6, ga: 6, points: 3 },
  { id: "tun", name: "Tunisia", short: "TUN", flag: "tn", group: "F", played: 2, won: 0, drawn: 0, lost: 2, gf: 1, ga: 9, points: 0 },
  { id: "egy", name: "Ai Cập", short: "EGY", flag: "eg", group: "G", played: 2, won: 1, drawn: 1, lost: 0, gf: 4, ga: 2, points: 4 },
  { id: "irn", name: "Iran", short: "IRN", flag: "ir", group: "G", played: 2, won: 0, drawn: 2, lost: 0, gf: 2, ga: 2, points: 2 },
  { id: "bel", name: "Bỉ", short: "BEL", flag: "be", group: "G", played: 2, won: 0, drawn: 2, lost: 0, gf: 1, ga: 1, points: 2 },
  { id: "nzl", name: "New Zealand", short: "NZL", flag: "nz", group: "G", played: 2, won: 0, drawn: 1, lost: 1, gf: 3, ga: 5, points: 1 },
  { id: "esp", name: "Tây Ban Nha", short: "ESP", flag: "es", group: "H", played: 2, won: 1, drawn: 1, lost: 0, gf: 4, ga: 0, points: 4 },
  { id: "uru", name: "Uruguay", short: "URU", flag: "uy", group: "H", played: 2, won: 0, drawn: 2, lost: 0, gf: 3, ga: 3, points: 2 },
  { id: "cpv", name: "Cape Verde", short: "CPV", flag: "cv", group: "H", played: 2, won: 0, drawn: 2, lost: 0, gf: 2, ga: 2, points: 2 },
  { id: "ksa", name: "Ả Rập Xê Út", short: "KSA", flag: "sa", group: "H", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 5, points: 1 },
  { id: "fra", name: "Pháp", short: "FRA", flag: "fr", group: "I", played: 2, won: 2, drawn: 0, lost: 0, gf: 6, ga: 1, points: 6 },
  { id: "nor", name: "Na Uy", short: "NOR", flag: "no", group: "I", played: 2, won: 2, drawn: 0, lost: 0, gf: 7, ga: 3, points: 6 },
  { id: "sen", name: "Senegal", short: "SEN", flag: "sn", group: "I", played: 2, won: 0, drawn: 0, lost: 2, gf: 3, ga: 6, points: 0 },
  { id: "irq", name: "Iraq", short: "IRQ", flag: "iq", group: "I", played: 2, won: 0, drawn: 0, lost: 2, gf: 1, ga: 7, points: 0 },
  { id: "arg", name: "Argentina", short: "ARG", flag: "ar", group: "J", played: 2, won: 2, drawn: 0, lost: 0, gf: 5, ga: 0, points: 6 },
  { id: "aut", name: "Áo", short: "AUT", flag: "at", group: "J", played: 2, won: 1, drawn: 0, lost: 1, gf: 3, ga: 3, points: 3 },
  { id: "alg", name: "Algeria", short: "ALG", flag: "dz", group: "J", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 4, points: 3 },
  { id: "jor", name: "Jordan", short: "JOR", flag: "jo", group: "J", played: 2, won: 0, drawn: 0, lost: 2, gf: 2, ga: 5, points: 0 },
  { id: "col", name: "Colombia", short: "COL", flag: "co", group: "K", played: 1, won: 1, drawn: 0, lost: 0, gf: 3, ga: 1, points: 3 },
  { id: "cod", name: "DR Congo", short: "COD", flag: "cd", group: "K", played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, points: 1 },
  { id: "por", name: "Bồ Đào Nha", short: "POR", flag: "pt", group: "K", played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, points: 1 },
  { id: "uzb", name: "Uzbekistan", short: "UZB", flag: "uz", group: "K", played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 3, points: 0 },
  { id: "eng", name: "Anh", short: "ENG", flag: "gb-eng", group: "L", played: 1, won: 1, drawn: 0, lost: 0, gf: 4, ga: 2, points: 3 },
  { id: "gha", name: "Ghana", short: "GHA", flag: "gh", group: "L", played: 1, won: 1, drawn: 0, lost: 0, gf: 1, ga: 0, points: 3 },
  { id: "pan", name: "Panama", short: "PAN", flag: "pa", group: "L", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 1, points: 0 },
  { id: "cro", name: "Croatia", short: "CRO", flag: "hr", group: "L", played: 1, won: 0, drawn: 0, lost: 1, gf: 2, ga: 4, points: 0 }
];

let matches = [
  result(1, "A", "2026-06-11T13:00:00-06:00", "Estadio Azteca, Mexico City", "Mexico", "Nam Phi", 2, 0, ["9' Julián Quiñones", "67' Raúl Jiménez"]),
  result(2, "A", "2026-06-11T20:00:00-06:00", "Estadio Akron, Guadalajara", "Hàn Quốc", "Czechia", 2, 1, ["67' Hwang In-beom", "80' Oh Hyeon-gyu", "59' Ladislav Krejčí"]),
  result(3, "A", "2026-06-18T12:00:00-04:00", "Mercedes-Benz Stadium, Atlanta", "Czechia", "Nam Phi", 1, 1, ["6' Michal Sadílek", "83' Teboho Mokoena (pen.)"]),
  result(4, "A", "2026-06-18T19:00:00-06:00", "Estadio Akron, Guadalajara", "Mexico", "Hàn Quốc", 1, 0, ["50' Luis Romo"]),
  result(5, "B", "2026-06-12T15:00:00-04:00", "BMO Field, Toronto", "Canada", "Bosnia và Herzegovina", 1, 1, ["78' Cyle Larin", "21' Jovo Lukić"]),
  result(6, "B", "2026-06-12T12:00:00-07:00", "Levi's Stadium, Santa Clara", "Qatar", "Thụy Sĩ", 1, 1, ["90+4' Miro Muheim (phản lưới)", "17' Breel Embolo (pen.)"]),
  result(7, "B", "2026-06-18T12:00:00-07:00", "SoFi Stadium, Los Angeles", "Thụy Sĩ", "Bosnia và Herzegovina", 4, 1, ["74', 90' Johan Manzambi", "84' Rubén Vargas", "90+7' Granit Xhaka (pen.)", "90+3' Ermin Mahmić"]),
  result(8, "B", "2026-06-18T15:00:00-07:00", "BC Place, Vancouver", "Canada", "Qatar", 6, 0, ["16' Cyle Larin", "29', 45+3', 90+2' Jonathan David", "64' Nathan Saliba", "75' Mohamed Manai (phản lưới)"]),
  result(9, "C", "2026-06-13T18:00:00-04:00", "MetLife Stadium, New York/New Jersey", "Brazil", "Ma Rốc", 1, 1, ["32' Vinícius Júnior", "21' Ismael Saibari"]),
  result(10, "C", "2026-06-13T21:00:00-04:00", "Gillette Stadium, Boston", "Haiti", "Scotland", 0, 1, ["28' John McGinn"]),
  result(11, "C", "2026-06-19T18:00:00-04:00", "Gillette Stadium, Boston", "Scotland", "Ma Rốc", 0, 1, ["2' Ismael Saibari"]),
  result(12, "C", "2026-06-19T20:30:00-04:00", "Lincoln Financial Field, Philadelphia", "Brazil", "Haiti", 3, 0, ["23', 36' Matheus Cunha", "45+3' Vinícius Júnior"]),
  result(13, "D", "2026-06-12T18:00:00-07:00", "SoFi Stadium, Los Angeles", "Hoa Kỳ", "Paraguay", 4, 1, ["7' Damián Bobadilla (phản lưới)", "31', 45+5' Folarin Balogun", "90+8' Giovanni Reyna", "73' Maurício"]),
  result(14, "D", "2026-06-13T21:00:00-07:00", "BC Place, Vancouver", "Australia", "Thổ Nhĩ Kỳ", 2, 0, ["27' Nestory Irankunda", "75' Connor Metcalfe"]),
  result(15, "D", "2026-06-19T12:00:00-07:00", "Lumen Field, Seattle", "Hoa Kỳ", "Australia", 2, 0, ["11' Cameron Burgess (phản lưới)", "43' Alex Freeman"]),
  result(16, "D", "2026-06-19T20:00:00-07:00", "Levi's Stadium, Santa Clara", "Thổ Nhĩ Kỳ", "Paraguay", 0, 1, ["2' Matías Galarza"]),
  result(17, "E", "2026-06-14T12:00:00-05:00", "NRG Stadium, Houston", "Đức", "Curaçao", 7, 1, ["6' Felix Nmecha", "38' Nico Schlotterbeck", "45+5', 88' Kai Havertz", "47' Jamal Musiala", "68' Nathaniel Brown", "78' Deniz Undav", "21' Livano Comenencia"]),
  result(18, "E", "2026-06-14T19:00:00-04:00", "Lincoln Financial Field, Philadelphia", "Bờ Biển Ngà", "Ecuador", 1, 0, ["90' Amad Diallo"]),
  result(19, "E", "2026-06-20T16:00:00-04:00", "BMO Field, Toronto", "Đức", "Bờ Biển Ngà", 2, 1, ["68', 90+4' Deniz Undav", "30' Franck Kessié"]),
  result(20, "E", "2026-06-20T19:00:00-05:00", "Arrowhead Stadium, Kansas City", "Ecuador", "Curaçao", 0, 0, []),
  result(21, "F", "2026-06-14T15:00:00-05:00", "AT&T Stadium, Dallas", "Hà Lan", "Nhật Bản", 2, 2, ["51' Virgil van Dijk", "64' Crysencio Summerville", "57' Keito Nakamura", "88' Daichi Kamada"]),
  result(22, "F", "2026-06-14T20:00:00-06:00", "Estadio BBVA, Monterrey", "Thụy Điển", "Tunisia", 5, 1, ["7', 90+6' Yasin Ayari", "30' Alexander Isak", "59' Viktor Gyökeres", "84' Mattias Svanberg", "43' Omar Rekik"]),
  result(23, "F", "2026-06-20T12:00:00-05:00", "NRG Stadium, Houston", "Hà Lan", "Thụy Điển", 5, 1, ["5', 17' Brian Brobbey", "47', 54' Cody Gakpo", "89' Crysencio Summerville", "59' Anthony Elanga"]),
  result(24, "F", "2026-06-20T22:00:00-06:00", "Estadio BBVA, Monterrey", "Tunisia", "Nhật Bản", 0, 4, ["4' Daichi Kamada", "31', 83' Ayase Ueda", "69' Junya Ito"]),
  result(25, "G", "2026-06-15T12:00:00-07:00", "Lumen Field, Seattle", "Bỉ", "Ai Cập", 1, 1, ["66' Mohamed Hany (phản lưới)", "19' Emam Ashour"]),
  result(26, "G", "2026-06-15T18:00:00-07:00", "SoFi Stadium, Los Angeles", "Iran", "New Zealand", 2, 2, ["32' Ramin Rezaeian", "64' Mohammad Mohebi", "7', 54' Elijah Just"]),
  result(27, "G", "2026-06-21T12:00:00-07:00", "SoFi Stadium, Los Angeles", "Bỉ", "Iran", 0, 0, []),
  result(28, "G", "2026-06-21T18:00:00-07:00", "BC Place, Vancouver", "New Zealand", "Ai Cập", 1, 3, ["15' Finn Surman", "58' Zizo", "67' Mohamed Salah", "82' Trézéguet"]),
  result(29, "H", "2026-06-15T12:00:00-04:00", "Mercedes-Benz Stadium, Atlanta", "Tây Ban Nha", "Cape Verde", 0, 0, []),
  result(30, "H", "2026-06-15T18:00:00-04:00", "Hard Rock Stadium, Miami", "Ả Rập Xê Út", "Uruguay", 1, 1, ["41' Abdulelah Al-Amri", "80' Maximiliano Araújo"]),
  result(31, "H", "2026-06-21T12:00:00-04:00", "Mercedes-Benz Stadium, Atlanta", "Tây Ban Nha", "Ả Rập Xê Út", 4, 0, ["10' Lamine Yamal", "21', 24' Mikel Oyarzabal", "49' Hassan Al-Tambakti (phản lưới)"]),
  result(32, "H", "2026-06-21T18:00:00-04:00", "Hard Rock Stadium, Miami", "Cape Verde", "Uruguay", 2, 2, ["Kevin Pina", "Hélio Varela", "Maximiliano Araújo", "Agustín Canobbio"]),
  result(33, "I", "2026-06-16T12:00:00-04:00", "MetLife Stadium, New York/New Jersey", "Pháp", "Senegal", 3, 1, ["Kylian Mbappé", "Michael Olise", "Bradley Barcola", "Ismaïla Sarr"]),
  result(34, "I", "2026-06-16T18:00:00-04:00", "Lincoln Financial Field, Philadelphia", "Iraq", "Na Uy", 1, 4, ["Erling Haaland", "Erling Haaland", "Martin Ødegaard", "Alexander Sørloth"]),
  result(35, "I", "2026-06-22T12:00:00-04:00", "MetLife Stadium, New York/New Jersey", "Na Uy", "Senegal", 3, 2, ["Erling Haaland x2", "Marcus Pedersen", "Ismaïla Sarr x2"]),
  result(36, "I", "2026-06-22T18:00:00-04:00", "Lincoln Financial Field, Philadelphia", "Pháp", "Iraq", 3, 0, ["14', 54' Kylian Mbappé", "66' Ousmane Dembélé"]),
  result(37, "J", "2026-06-16T20:00:00-05:00", "Arrowhead Stadium, Kansas City", "Argentina", "Algeria", 3, 0, ["17', 60', 76' Lionel Messi"]),
  result(38, "J", "2026-06-16T21:00:00-07:00", "Levi's Stadium, Santa Clara", "Áo", "Jordan", 3, 1, ["20' Romano Schmid", "76' Yazan Al-Arab (phản lưới)", "90+12' Marko Arnautović (pen.)", "50' Ali Olwan"]),
  result(39, "J", "2026-06-22T12:00:00-05:00", "AT&T Stadium, Dallas", "Argentina", "Áo", 2, 0, ["Lionel Messi x2"]),
  result(40, "J", "2026-06-22T20:00:00-07:00", "Levi's Stadium, Santa Clara", "Jordan", "Algeria", 1, 2, ["36' Nizar Al-Rashdan", "69' Nadhir Benbouali", "82' Amine Gouiri"]),
  result(41, "K", "2026-06-17T12:00:00-05:00", "NRG Stadium, Houston", "Bồ Đào Nha", "DR Congo", 1, 1, ["6' João Neves", "45+5' Yoane Wissa"]),
  result(42, "K", "2026-06-17T20:00:00-06:00", "Estadio Azteca, Mexico City", "Uzbekistan", "Colombia", 1, 3, ["60' Abbosbek Fayzullaev", "40' Daniel Muñoz", "65' Luis Díaz", "90+9' Jaminton Campaz"]),
  result(43, "L", "2026-06-17T15:00:00-05:00", "AT&T Stadium, Dallas", "Anh", "Croatia", 4, 2, ["12', 42' Harry Kane", "47' Jude Bellingham", "85' Marcus Rashford", "36' Martin Baturina", "45+5' Petar Musa"]),
  result(44, "L", "2026-06-17T19:00:00-04:00", "BMO Field, Toronto", "Ghana", "Panama", 1, 0, ["90+5' Kwame Yirenkyi"]),
  upcoming(45, "K", "2026-06-23T12:00:00-05:00", "NRG Stadium, Houston", "Bồ Đào Nha", "Uzbekistan"),
  upcoming(46, "L", "2026-06-23T16:00:00-04:00", "Gillette Stadium, Boston", "Anh", "Ghana"),
  upcoming(47, "L", "2026-06-23T19:00:00-04:00", "BMO Field, Toronto", "Panama", "Croatia"),
  upcoming(48, "K", "2026-06-23T20:00:00-06:00", "Estadio Akron, Guadalajara", "Colombia", "DR Congo"),
  upcoming(49, "C", "2026-06-24T18:00:00-04:00", "Hard Rock Stadium, Miami", "Scotland", "Brazil"),
  upcoming(50, "C", "2026-06-24T18:00:00-04:00", "Mercedes-Benz Stadium, Atlanta", "Ma Rốc", "Haiti"),
  upcoming(51, "B", "2026-06-24T12:00:00-07:00", "BC Place, Vancouver", "Thụy Sĩ", "Canada"),
  upcoming(52, "B", "2026-06-24T12:00:00-07:00", "Lumen Field, Seattle", "Bosnia và Herzegovina", "Qatar"),
  upcoming(53, "A", "2026-06-24T19:00:00-06:00", "Estadio Azteca, Mexico City", "Czechia", "Mexico"),
  upcoming(54, "A", "2026-06-24T19:00:00-06:00", "Estadio BBVA, Monterrey", "Nam Phi", "Hàn Quốc"),
  upcoming(55, "E", "2026-06-25T16:00:00-04:00", "Lincoln Financial Field, Philadelphia", "Curaçao", "Bờ Biển Ngà"),
  upcoming(56, "E", "2026-06-25T16:00:00-04:00", "MetLife Stadium, New York/New Jersey", "Ecuador", "Đức"),
  upcoming(57, "F", "2026-06-25T18:00:00-05:00", "AT&T Stadium, Dallas", "Nhật Bản", "Thụy Điển"),
  upcoming(58, "F", "2026-06-25T18:00:00-05:00", "Arrowhead Stadium, Kansas City", "Tunisia", "Hà Lan"),
  upcoming(59, "D", "2026-06-25T19:00:00-07:00", "SoFi Stadium, Los Angeles", "Thổ Nhĩ Kỳ", "Hoa Kỳ"),
  upcoming(60, "D", "2026-06-25T19:00:00-07:00", "Levi's Stadium, Santa Clara", "Paraguay", "Australia"),
  upcoming(61, "I", "2026-06-26T20:00:00-04:00", "Gillette Stadium, Boston", "Na Uy", "Pháp"),
  upcoming(62, "I", "2026-06-26T20:00:00-04:00", "BMO Field, Toronto", "Senegal", "Iraq"),
  upcoming(63, "G", "2026-06-26T20:00:00-07:00", "Lumen Field, Seattle", "Ai Cập", "Iran"),
  upcoming(64, "G", "2026-06-26T20:00:00-07:00", "BC Place, Vancouver", "New Zealand", "Bỉ"),
  upcoming(65, "H", "2026-06-26T19:00:00-05:00", "NRG Stadium, Houston", "Cape Verde", "Ả Rập Xê Út"),
  upcoming(66, "H", "2026-06-26T19:00:00-06:00", "Estadio Akron, Guadalajara", "Uruguay", "Tây Ban Nha"),
  upcoming(67, "L", "2026-06-27T17:00:00-04:00", "MetLife Stadium, New York/New Jersey", "Panama", "Anh"),
  upcoming(68, "L", "2026-06-27T17:00:00-04:00", "Lincoln Financial Field, Philadelphia", "Croatia", "Ghana"),
  upcoming(69, "J", "2026-06-27T21:00:00-05:00", "Arrowhead Stadium, Kansas City", "Algeria", "Áo"),
  upcoming(70, "J", "2026-06-27T21:00:00-05:00", "AT&T Stadium, Dallas", "Jordan", "Argentina"),
  upcoming(71, "K", "2026-06-27T20:00:00-04:00", "Hard Rock Stadium, Miami", "Colombia", "Bồ Đào Nha"),
  upcoming(72, "K", "2026-06-27T20:00:00-04:00", "Mercedes-Benz Stadium, Atlanta", "DR Congo", "Uzbekistan")
];

const state = { view: "standings", group: "all", query: "" };
const views = {
  standings: document.querySelector("#standingsView"),
  results: document.querySelector("#resultsView"),
  schedule: document.querySelector("#scheduleView")
};
const titles = {
  standings: ["Tổng quan bảng đấu", "Bảng xếp hạng"],
  results: ["Các trận đã kết thúc", "Tỷ số đã qua"],
  schedule: ["Những trận tiếp theo", "Lịch thi đấu sắp tới"]
};
const formatter = new Intl.DateTimeFormat("vi-VN", {
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});
const REFRESH_INTERVAL_MS = 60 * 60 * 1000;
let countdownTimer;
let refreshTimer;
let lastRemoteFetchAt = 0;

function result(id, group, date, venue, home, away, homeScore, awayScore, events) {
  return { id, group, status: "finished", date, venue, home, away, homeScore, awayScore, events: events.map((text) => ({ type: "goal", text })) };
}

function upcoming(id, group, date, venue, home, away) {
  return { id, group, status: "upcoming", date, venue, home, away };
}

function getTeam(name) {
  return teams.find((team) => team.name === name);
}

function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function matchSearch(value) {
  return !state.query || normalize(value).includes(normalize(state.query));
}

function teamChip(name) {
  const team = getTeam(name);
  const fallback = team?.short || name.slice(0, 3).toUpperCase();
  const flag = team?.logo
    ? `<img src="${team.logo}" alt="${name}" loading="lazy" />`
    : team?.flag
    ? `<img src="https://flagcdn.com/w80/${team.flag}.png" alt="Cờ ${name}" loading="lazy" />`
    : fallback;
  return `<span class="flag">${flag}</span><span class="team-name">${name}</span>`;
}

function filteredTeams() {
  return teams.filter((team) => {
    const groupOk = state.group === "all" || team.group === state.group;
    return groupOk && matchSearch(`${team.name} ${team.short} Bảng ${team.group}`);
  });
}

function filteredMatches(status) {
  return matches.filter((match) => {
    const groupOk = state.group === "all" || match.group === state.group;
    return match.status === status && groupOk && matchSearch(`${match.home} ${match.away} ${match.venue} Bảng ${match.group}`);
  });
}

function getFinishedMatches() {
  return matches
    .filter((match) => match.status === "finished")
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getUpcomingMatches() {
  const now = Date.now();
  return matches
    .filter((match) => match.status !== "finished" && new Date(match.date).getTime() > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function formatCountdown(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return "Trận đấu đang diễn ra hoặc sắp cập nhật trạng thái";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  if (days > 0) return `Còn ${days} ngày ${hours} giờ ${minutes} phút`;
  return `Còn ${hours} giờ ${minutes} phút ${seconds} giây`;
}

function sortStandings(a, b) {
  const gdA = a.gf - a.ga;
  const gdB = b.gf - b.ga;
  return b.points - a.points || gdB - gdA || b.gf - a.gf || a.name.localeCompare(b.name, "vi");
}

function renderStandings() {
  const grouped = filteredTeams().reduce((acc, team) => {
    acc[team.group] ||= [];
    acc[team.group].push(team);
    return acc;
  }, {});

  const cards = Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([group, groupTeams]) => {
      const rows = groupTeams.sort(sortStandings).map((team, index) => `
        <tr>
          <td><span class="rank">${index + 1}</span></td>
          <td><span class="team-cell">${teamChip(team.name)}</span></td>
          <td>${team.played}</td>
          <td>${team.won}</td>
          <td>${team.drawn}</td>
          <td>${team.lost}</td>
          <td>${team.gf}</td>
          <td>${team.ga}</td>
          <td>${team.gf - team.ga > 0 ? "+" : ""}${team.gf - team.ga}</td>
          <td><strong>${team.points}</strong></td>
        </tr>
      `).join("");

      return `
        <article class="group-card">
          <div class="group-header">
            <h3>Bảng ${group}</h3>
            <span>${groupTeams.length} đội</span>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Hạng</th><th>Đội</th><th>Trận</th><th>Thắng</th><th>Hòa</th><th>Thua</th><th>BT</th><th>BB</th><th>HS</th><th>Điểm</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </article>
      `;
    });

  views.standings.innerHTML = `<div class="group-grid">${cards.join("")}</div>`;
  return filteredTeams().length;
}

function renderMatchCard(match) {
  const isFinished = match.status === "finished";
  return `
    <article class="match-card ${isFinished ? "past" : ""}" ${isFinished ? `data-match-id="${match.id}" tabindex="0" role="button" aria-label="Xem chi tiết ${match.home} gặp ${match.away}"` : ""}>
      <div class="team home">${teamChip(match.home)}</div>
      <div class="score-block">
        <span class="status-pill ${isFinished ? "finished" : "upcoming"}">${isFinished ? "Đã kết thúc" : "Sắp diễn ra"}</span>
        <span class="score">${isFinished ? `${match.homeScore} - ${match.awayScore}` : "vs"}</span>
        <span class="match-meta">Bảng ${match.group} · ${formatter.format(new Date(match.date))}</span>
        <span class="match-meta">${match.venue}</span>
      </div>
      <div class="team away">${teamChip(match.away)}</div>
    </article>
  `;
}

function renderResults() {
  const data = filteredMatches("finished").sort((a, b) => new Date(b.date) - new Date(a.date));
  views.results.innerHTML = `<div class="match-list">${data.map(renderMatchCard).join("")}</div>`;
  return data.length;
}

function renderSchedule() {
  const data = filteredMatches("upcoming").sort((a, b) => new Date(a.date) - new Date(b.date));
  views.schedule.innerHTML = `<div class="match-list">${data.map(renderMatchCard).join("")}</div>`;
  return data.length;
}

function renderStats() {
  const played = matches.filter((match) => match.status === "finished");
  const goals = played.reduce((total, match) => total + match.homeScore + match.awayScore, 0);
  document.querySelector("#teamCount").textContent = teams.length;
  document.querySelector("#playedCount").textContent = played.length;
  document.querySelector("#upcomingCount").textContent = matches.filter((match) => match.status === "upcoming").length;
  document.querySelector("#goalCount").textContent = goals;
  const featured = played[played.length - 1];
  if (featured) {
    document.querySelector("#featuredMatch").textContent = `${featured.home} ${featured.homeScore} - ${featured.awayScore} ${featured.away}`;
    document.querySelector("#featuredMeta").textContent = `Bảng ${featured.group} · dữ liệu mới nhất`;
  }
}

function render() {
  const counts = {
    standings: renderStandings(),
    results: renderResults(),
    schedule: renderSchedule()
  };
  Object.entries(views).forEach(([name, element]) => element.classList.toggle("active-view", name === state.view));
  document.querySelector("#viewKicker").textContent = titles[state.view][0];
  document.querySelector("#viewTitle").textContent = titles[state.view][1];
  document.querySelector("#resultCount").textContent = `${counts[state.view]} mục`;
  document.querySelector("#emptyState").hidden = counts[state.view] > 0;
}

function renderGroupOptions() {
  const groupFilter = document.querySelector("#groupFilter");
  groupFilter.querySelectorAll("option:not([value='all'])").forEach((option) => option.remove());
  [...new Set(teams.map((team) => team.group))].sort().forEach((group) => {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = `Bảng ${group}`;
    groupFilter.append(option);
  });
}

async function loadRemoteData() {
  if (location.protocol === "file:") return null;

  try {
    const response = await fetch("/api/worldcup", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`API ${response.status}`);
    const data = await response.json();

    if (!Array.isArray(data.teams) || !Array.isArray(data.matches) || data.teams.length < 12) {
      throw new Error("API data is incomplete");
    }

    showDataSource(data);
    return data;
  } catch (error) {
    console.warn("Không tải được API World Cup, dùng dữ liệu fallback:", error);
    showDataSource({ source: "Dữ liệu dự phòng trong app", updatedAt: "2026-06-23T00:00:00+07:00" });
    return null;
  }
}

function showDataSource(data) {
  const note = document.querySelector(".note p");
  if (!note) return;
  const updated = data.updatedAt ? formatter.format(new Date(data.updatedAt)) : "không rõ thời điểm";
  note.textContent = `Nguồn dữ liệu: ${data.source || "fallback"} · Cập nhật: ${updated}. Thống kê nâng cao chỉ hiện khi API có dữ liệu đáng tin cậy.`;
}

function openMatchDialog(matchId) {
  const match = matches.find((item) => item.id === Number(matchId));
  if (!match) return;
  const goals = match.events?.length ? match.events.map((event) => `
    <div class="timeline-item">
      <span class="minute">⚽</span>
      <span>${event.text}</span>
    </div>
  `).join("") : `<p>Trận này chưa có danh sách ghi bàn chi tiết.</p>`;

  document.querySelector("#dialogContent").innerHTML = `
    <div class="dialog-title">
      <p class="eyebrow">Chi tiết trận đấu · Bảng ${match.group}</p>
      <h3>${match.home} ${match.homeScore} - ${match.awayScore} ${match.away}</h3>
      <p>${formatter.format(new Date(match.date))} · ${match.venue}</p>
    </div>
    <div class="detail-grid">
      <div class="detail-box"><span>${match.homeScore + match.awayScore}</span>Bàn thắng</div>
      <div class="detail-box"><span>Chờ</span>Cầm bóng</div>
      <div class="detail-box"><span>Chờ</span>Cú sút</div>
      <div class="detail-box"><span>Chờ</span>Lỗi</div>
      <div class="detail-box"><span>Chờ</span>Thẻ vàng</div>
      <div class="detail-box"><span>Chờ</span>Thẻ đỏ</div>
    </div>
    <p class="detail-note">Các thống kê nâng cao chỉ hiển thị khi có post-match report đáng tin cậy. App hiện không tự bịa số liệu cầm bóng, lỗi hoặc thẻ.</p>
    <h4>Diễn biến ghi bàn</h4>
    <div class="timeline">${goals}</div>
  `;
  document.querySelector("#matchDialog").showModal();
}

function renderMatchCard(match) {
  const isFinished = match.status === "finished";
  const cardClass = isFinished ? "past" : "upcoming-card";
  const score = isFinished ? `${match.homeScore ?? 0} - ${match.awayScore ?? 0}` : "vs";
  const statusText = isFinished ? "Đã kết thúc" : "Sắp diễn ra";

  return `
    <article class="match-card ${cardClass}" data-match-id="${match.id}" tabindex="0" role="button" aria-label="${isFinished ? "Xem kết quả" : "Xem lịch"} ${match.home} gặp ${match.away}">
      <div class="team home">${teamChip(match.home)}</div>
      <div class="score-block">
        <span class="status-pill ${isFinished ? "finished" : "upcoming"}">${statusText}</span>
        <span class="score">${score}</span>
        <span class="match-meta">Bảng ${match.group || "-"} · ${formatter.format(new Date(match.date))}</span>
        <span class="match-meta">${match.venue || "Đang cập nhật sân"}</span>
      </div>
      <div class="team away">${teamChip(match.away)}</div>
    </article>
  `;
}

function renderResults() {
  const data = getFinishedMatches().filter((match) => {
    const groupOk = state.group === "all" || match.group === state.group;
    return groupOk && matchSearch(`${match.home} ${match.away} ${match.venue || ""} Bảng ${match.group}`);
  });
  views.results.innerHTML = `<div class="match-list">${data.map(renderMatchCard).join("")}</div>`;
  return data.length;
}

function renderSchedule() {
  const data = getUpcomingMatches().filter((match) => {
    const groupOk = state.group === "all" || match.group === state.group;
    return groupOk && matchSearch(`${match.home} ${match.away} ${match.venue || ""} Bảng ${match.group}`);
  });
  views.schedule.innerHTML = `<div class="match-list">${data.map(renderMatchCard).join("")}</div>`;
  return data.length;
}

function updateFeaturedMatch() {
  const featured = getUpcomingMatches()[0];
  const matchEl = document.querySelector("#featuredMatch");
  const metaEl = document.querySelector("#featuredMeta");
  const countdownEl = document.querySelector("#featuredCountdown");

  if (!featured) {
    const latest = getFinishedMatches()[0];
    matchEl.textContent = latest ? `${latest.home} ${latest.homeScore} - ${latest.awayScore} ${latest.away}` : "Chưa có trận đấu";
    metaEl.textContent = latest ? `Trận mới nhất · ${formatter.format(new Date(latest.date))}` : "Đang chờ dữ liệu từ API";
    countdownEl.textContent = "";
    return;
  }

  matchEl.textContent = `${featured.home} vs ${featured.away}`;
  metaEl.textContent = `Bảng ${featured.group || "-"} · ${formatter.format(new Date(featured.date))} · ${featured.venue || "Đang cập nhật sân"}`;
  countdownEl.textContent = formatCountdown(featured.date);
}

function renderStats() {
  const played = getFinishedMatches();
  const upcoming = getUpcomingMatches();
  const goals = played.reduce((total, match) => total + Number(match.homeScore || 0) + Number(match.awayScore || 0), 0);
  document.querySelector("#teamCount").textContent = teams.length;
  document.querySelector("#playedCount").textContent = played.length;
  document.querySelector("#upcomingCount").textContent = upcoming.length;
  document.querySelector("#goalCount").textContent = goals;
  updateFeaturedMatch();
}

async function loadRemoteData() {
  if (location.protocol === "file:") return null;

  try {
    lastRemoteFetchAt = Date.now();
    const response = await fetch("/api/worldcup", {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`API ${response.status}`);
    const data = await response.json();

    if (!Array.isArray(data.teams) || !Array.isArray(data.matches) || data.teams.length < 12) {
      throw new Error(data.message || data.apiError || "API data is incomplete");
    }

    showDataSource(data);
    return data;
  } catch (error) {
    console.warn("Không tải được API World Cup, dùng dữ liệu fallback:", error);
    showDataSource({ source: "Dữ liệu dự phòng trong app", updatedAt: "2026-06-23T00:00:00+07:00" });
    return null;
  }
}

function showDataSource(data) {
  const note = document.querySelector(".note p");
  if (!note) return;
  const updated = data.updatedAt ? formatter.format(new Date(data.updatedAt)) : "không rõ thời điểm";
  note.textContent = `Nguồn dữ liệu: ${data.source || "fallback"} · Cập nhật: ${updated}. App tự động cập nhật theo cache Netlify để tiết kiệm quota API.`;
}

function openTeamsDialog() {
  const sortedTeams = [...teams].sort((a, b) => (a.group || "").localeCompare(b.group || "") || a.name.localeCompare(b.name, "vi"));
  document.querySelector("#dialogContent").innerHTML = `
    <div class="dialog-title">
      <p class="eyebrow">48 đội tuyển</p>
      <h3>Danh sách đội tham dự World Cup 2026</h3>
      <p>Click ô 48 đội tuyển để xem nhanh cờ và bảng đấu của các đội.</p>
    </div>
    <div class="team-gallery">
      ${sortedTeams.map((team) => `
        <div class="team-tile">
          ${teamChip(team.name)}
          <small>Bảng ${team.group || "-"}</small>
        </div>
      `).join("")}
    </div>
  `;
  document.querySelector("#matchDialog").showModal();
}

function openMatchDialog(matchId) {
  const match = matches.find((item) => String(item.id) === String(matchId));
  if (!match) return;

  const isFinished = match.status === "finished";
  const title = isFinished ? `${match.home} ${match.homeScore ?? 0} - ${match.awayScore ?? 0} ${match.away}` : `${match.home} vs ${match.away}`;
  const goals = match.events?.length ? match.events.map((event) => `
    <div class="timeline-item">
      <span class="minute">Goal</span>
      <span>${event.text}</span>
    </div>
  `).join("") : `<p>${isFinished ? "API chưa trả danh sách ghi bàn chi tiết cho trận này." : "Trận này chưa diễn ra."}</p>`;

  document.querySelector("#dialogContent").innerHTML = `
    <div class="dialog-title">
      <p class="eyebrow">${isFinished ? "Kết quả trận đấu" : "Lịch thi đấu"} · Bảng ${match.group || "-"}</p>
      <h3>${title}</h3>
      <p>${formatter.format(new Date(match.date))} · ${match.venue || "Đang cập nhật sân"}</p>
      ${!isFinished ? `<p class="countdown-text">${formatCountdown(match.date)}</p>` : ""}
    </div>
    <div class="detail-grid">
      <div class="detail-box"><span>${isFinished ? `${match.homeScore ?? 0} - ${match.awayScore ?? 0}` : "VS"}</span>Tỷ số</div>
      <div class="detail-box"><span>${match.group || "-"}</span>Bảng</div>
      <div class="detail-box"><span>${isFinished ? Number(match.homeScore || 0) + Number(match.awayScore || 0) : "Chờ"}</span>Bàn thắng</div>
      <div class="detail-box"><span>${isFinished ? "API" : "Chờ"}</span>Nguồn dữ liệu</div>
      <div class="detail-box"><span>Chờ</span>Cầm bóng</div>
      <div class="detail-box"><span>Chờ</span>Thẻ/Lỗi</div>
    </div>
    <p class="detail-note">Tỷ số, lịch và bảng đấu lấy từ API khi đã cấu hình key trên Netlify. Các thống kê nâng cao chỉ hiện khi provider trả dữ liệu đáng tin cậy.</p>
    <h4>${isFinished ? "Diễn biến ghi bàn" : "Thông tin trận đấu"}</h4>
    <div class="timeline">${goals}</div>
  `;
  document.querySelector("#matchDialog").showModal();
}

function switchView(view) {
  state.view = view;
  document.querySelectorAll(".tab-button").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  render();
  document.querySelector(".content-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openStatAction(action) {
  if (action === "teams") {
    openTeamsDialog();
    return;
  }
  switchView(action);
}

async function refreshRemoteData({ silent = true } = {}) {
  const remoteData = await loadRemoteData();
  if (!remoteData) return;
  teams = remoteData.teams;
  matches = remoteData.matches;
  renderGroupOptions();
  renderStats();
  render();
  if (!silent) showDataSource(remoteData);
}

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.view = button.dataset.view;
    document.querySelectorAll(".tab-button").forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
});
document.querySelector("#groupFilter").addEventListener("change", (event) => {
  state.group = event.target.value;
  render();
});
document.querySelector("#searchInput").addEventListener("input", (event) => {
  state.query = event.target.value.trim();
  render();
});
document.querySelectorAll("[data-stat-action]").forEach((item) => {
  item.addEventListener("click", () => openStatAction(item.dataset.statAction));
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openStatAction(item.dataset.statAction);
    }
  });
});
document.addEventListener("click", (event) => {
  const card = event.target.closest("[data-match-id]");
  if (card) openMatchDialog(card.dataset.matchId);
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const card = event.target.closest("[data-match-id]");
  if (card) openMatchDialog(card.dataset.matchId);
});
document.querySelector(".close-dialog").addEventListener("click", () => document.querySelector("#matchDialog").close());

async function initApp() {
  await refreshRemoteData({ silent: false });
  renderGroupOptions();
  renderStats();
  render();

  clearInterval(countdownTimer);
  countdownTimer = setInterval(updateFeaturedMatch, 1000);

  clearInterval(refreshTimer);
  refreshTimer = setInterval(() => refreshRemoteData(), REFRESH_INTERVAL_MS);
}

initApp();

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && Date.now() - lastRemoteFetchAt > REFRESH_INTERVAL_MS) {
    refreshRemoteData();
  }
});
