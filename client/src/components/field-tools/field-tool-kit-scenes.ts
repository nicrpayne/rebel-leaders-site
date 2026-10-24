// Coordinates use each original 1536 × 1024 scene. Desktop bottom edges
// carry the accepted 20px left adjustment; the top corners stay fixed.
// Desktop and phone captures are 1347 × 850 and 390 × 1000 respectively.
export type KitScene = {
  title: string;
  coverImage?: string;
  coverTransform?: string;
  scene: string;
  desktopImage: string;
  mobileImage: string;
  // Optional close-up of real fields for the standalone phone display (390 × 810).
  mobileDetailImage?: string;
  desktopTransform: string;
  mobileTransform: string;
  erase: string;
  book: string;
  phone: string;
  mobileSceneClip?: string;
  mobileErase?: string;
};
export const FIELD_TOOL_KIT_SCENES: Record<string, KitScene> = {
  "ai-stalemate-pm": {
    coverImage: "ai-stalemate-pm-cover-v3.webp",
    coverTransform:
      "matrix3d(0.782222544378,-0.0125676981164,0,6.10275461696e-05,0.0392988490966,0.806095644284,0,-5.65450038221e-05,0,0,1,0,51,142,0,1)",
    title: "AI Stalemate PM",
    scene: "ai-stalemate-pm-kit-v2.webp",
    desktopImage: "ai-stalemate-pm-lab-preview-v7.webp",
    mobileImage: "ai-stalemate-pm-mobile-lab-preview-v6.webp",
    desktopTransform:
      "matrix3d(0.523239145407,-0.020735222016,0,-0.00005945317,-0.077111601085,0.60860990841,0,-0.000025626772,0,0,1,0,584,142,0,1)",
    mobileTransform:
      "matrix3d(0.406419169861,-0.010952484707,0,-0.000045475103,-0.05141193511,0.462660744174,0,-0.000022853096,0,0,1,0,1309,407,0,1)",
    erase: "572,128 1415,110 1399,720 539,689",
    book: "39,142 530,129 593,870 81,914",
    phone:
      "M1333 395 L1471 395 Q1509 395 1511 432 L1498 873 Q1496 918 1467 920 L1310 905 Q1274 902 1274 867 L1296 434 Q1296 398 1333 395 Z",
    mobileSceneClip:
      "M1332 408 L1354 408 L1355 415 Q1355 426 1366 426 L1432 426 Q1443 426 1443 413 L1443 408 L1471 408 Q1493 408 1493 432 L1477 880 Q1476 903 1455 901 L1310 890 Q1286 888 1289 864 L1308 433 Q1308 410 1332 408 Z",
  },
  "ai-stalemate-lead-dev": {
    coverImage: "ai-stalemate-lead-dev-cover-v6.webp",
    coverTransform:
      "matrix3d(0.783806375775,-0.0126869860631,0,6.10493347185e-05,0.0406120058852,0.81034720441,0,-5.43247216522e-05,0,0,1,0,50,140,0,1)",
    mobileErase:
      "M1301.27 420.99 Q1302 401 1322.00 401.20 L1479.00 402.80 Q1499 403 1498.32 422.99 L1482.68 886.01 Q1482 906 1462.05 904.59 L1303.95 893.41 Q1284 892 1284.73 872.01 L1301.27 420.99 Z",
    title: "AI Stalemate Lead Developer",
    scene: "ai-stalemate-lead-dev-kit-v1.webp",
    desktopImage: "ai-stalemate-lead-dev-lab-preview-v8.webp",
    mobileImage: "ai-stalemate-lead-dev-mobile-lab-preview-v7.webp",
    mobileDetailImage: "ai-stalemate-lead-dev-phone-detail-v5.webp",
    desktopTransform:
      "matrix3d(0.541639466992,-0.014018289042,0,-0.000046815949,-0.075223780459,0.622687092833,0,-0.000022064847,0,0,1,0,584,136,0,1)",
    mobileTransform:
      "matrix3d(0.393843936256,-0.019368565171,0,-0.00006063557,-0.035210449351,0.476807370114,0,-0.000012575989,0,0,1,0,1308,402,0,1)",
    erase: "580,133 1404,122 1399,712 546,685",
    book: "38,140 530,127 593,870 81,914",
    phone:
      "M1331 390 L1473 390 Q1511 390 1511 434 L1496 876 Q1493 918 1461 918 L1309 906 Q1276 903 1277 866 L1297 429 Q1298 390 1331 390 Z",
  },
  "deadline-reset": {
    coverImage: "deadline-reset-cover-v2.webp",
    coverTransform:
      "matrix3d(0.753219141323,-0.0256008145832,0,2.12682851121e-05,0.036202224503,0.780547814543,0,-4.46797117294e-05,0,0,1,0,49,145,0,1)",
    mobileErase:
      "M1301.15 427.98 Q1302 408 1322.00 408.20 L1479.00 409.80 Q1499 410 1498.17 429.98 L1478.83 893.02 Q1478 913 1458.04 911.68 L1300.96 901.32 Q1281 900 1281.85 880.02 L1301.15 427.98 Z",
    title: "Deadline Reset",
    scene: "deadline-reset-kit-v1.webp",
    desktopImage: "deadline-reset-lab-preview-v6.webp",
    mobileImage: "deadline-reset-mobile-lab-preview-v5.webp",
    desktopTransform:
      "matrix3d(0.546552103521,-0.016104670827,0,-0.000046058096,-0.075018128488,0.623237334233,0,-0.000032962182,0,0,1,0,576,138,0,1)",
    mobileTransform:
      "matrix3d(0.400934965028,-0.017846178606,0,-0.000055898744,-0.031867076716,0.482109926212,0,-0.000007672688,0,0,1,0,1308,409,0,1)",
    erase: "573,135 1401,121 1398,716 547,694",
    book: "37,145 523,127 578,854 75,883",
    phone:
      "M1330 396 L1470 397 Q1511 397 1511 435 L1493 886 Q1490 925 1457 925 L1306 914 Q1272 911 1274 877 L1295 437 Q1297 397 1330 396 Z",
  },
  "priority-whiplash": {
    coverImage: "priority-whiplash-cover-v2.webp",
    coverTransform:
      "matrix3d(0.767166405265,-0.0167567907543,0,5.37646842995e-05,0.032634889997,0.783308491055,0,-5.84419066002e-05,0,0,1,0,54,142,0,1)",
    mobileErase:
      "M1303.32 426.99 Q1304 407 1324.00 407.10 L1477.00 407.90 Q1497 408 1496.33 427.99 L1480.67 896.01 Q1480 916 1460.04 914.76 L1306.96 905.24 Q1287 904 1287.68 884.01 L1303.32 426.99 Z",
    title: "Priority Whiplash",
    scene: "priority-whiplash-kit-v1.webp",
    desktopImage: "priority-whiplash-lab-preview-v6.webp",
    mobileImage: "priority-whiplash-mobile-lab-preview-v5.webp",
    desktopTransform:
      "matrix3d(0.540425857359,-0.014511282383,0,-0.000051169249,-0.088171273357,0.607064812108,0,-0.000040137737,0,0,1,0,583,135,0,1)",
    mobileTransform:
      "matrix3d(0.391530240851,-0.020096066001,0,-0.000055403835,-0.027497779761,0.487369197102,0,-0.000007351223,0,0,1,0,1310,408,0,1)",
    erase: "580,132 1410,121 1406,709 546,681",
    book: "42,142 526,127 584,852 78,894",
    phone:
      "M1335 395 L1470 396 Q1508 395 1508 435 L1495 889 Q1493 928 1459 928 L1311 918 Q1277 915 1279 878 L1297 436 Q1298 396 1335 395 Z",
  },
  "mandate-reset": {
    coverImage: "mandate-reset-cover-v2.webp",
    coverTransform:
      "matrix3d(0.751604297842,-0.0357776397664,0,3.03844288296e-06,0.0369096997941,0.833294737722,0,-2.30138266833e-05,0,0,1,0,51,150,0,1)",
    mobileErase:
      "M1297.36 428.99 Q1298 409 1318.00 409.00 L1472.00 409.00 Q1492 409 1491.57 429.00 L1481.43 900.00 Q1481 920 1461.02 919.10 L1301.98 911.90 Q1282 911 1282.64 891.01 L1297.36 428.99 Z",
    title: "Mandate Reset",
    scene: "mandate-reset-kit-v1.webp",
    desktopImage: "mandate-reset-lab-preview-v6.webp",
    mobileImage: "mandate-reset-mobile-lab-preview-v5.webp",
    desktopTransform:
      "matrix3d(0.572309491033,-0.010938551802,0,-0.000028117175,-0.069893332407,0.653888917101,0,-0.000031805171,0,0,1,0,578,135,0,1)",
    mobileTransform:
      "matrix3d(0.411418509283,-0.0180247468,0,-0.000043962797,-0.058482962053,0.469700844984,0,-0.000032232294,0,0,1,0,1304,410,0,1)",
    erase: "575,132 1405,122 1404,729 551,716",
    book: "39,150 530,127 575,894 76,919",
    phone:
      "M1327 397 L1467 397 Q1505 397 1504 437 L1494 889 Q1492 932 1459 932 L1308 924 Q1273 921 1275 884 L1288 440 Q1287 398 1327 397 Z",
  },
  "when-the-team-goes-quiet": {
    coverImage: "when-the-team-goes-quiet-cover-v2.webp",
    coverTransform:
      "matrix3d(0.774184363569,-0.0121473777006,0,4.87816110102e-05,0.0328827854154,0.774271534834,0,-1.88151690244e-05,0,0,1,0,52,183,0,1)",
    mobileErase:
      "M1302.35 419.99 Q1303 400 1323.00 400.31 L1479.00 402.69 Q1499 403 1498.21 422.98 L1479.79 887.02 Q1479 907 1459.04 905.75 L1306.96 896.25 Q1287 895 1287.65 875.01 L1302.35 419.99 Z",
    title: "When the Team Goes Quiet",
    scene: "when-the-team-goes-quiet-kit-v1.webp",
    desktopImage: "when-the-team-goes-quiet-lab-preview-v6.webp",
    mobileImage: "when-the-team-goes-quiet-mobile-lab-preview-v5.webp",
    mobileDetailImage: "when-the-team-goes-quiet-phone-detail-v3.webp",
    desktopTransform:
      "matrix3d(0.572732857621,-0.010111037652,0,-0.000033110426,-0.041108745177,0.645822337213,0,-0.000008637164,0,0,1,0,568,134,0,1)",
    mobileTransform:
      "matrix3d(0.411787918296,-0.01126988266,0,-0.000046936115,0.001394576271,0.504713898305,0,0.000014237288,0,0,1,0,1309,401,0,1)",
    erase: "565,131 1405,123 1403,712 555,695",
    book: "40,183 530,170 568,860 73,895",
    phone:
      "M1336 390 L1472 392 Q1510 392 1510 433 L1494 881 Q1493 921 1455 919 L1311 909 Q1277 906 1279 871 L1297 433 Q1298 392 1336 390 Z",
  },
};
