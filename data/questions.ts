import { Question } from '../types';

export const mockQuestions: Question[] = [
  {
    "id": "q1",
    "text": "Snowflakeのアーキテクチャにおいて、認証、インフラストラクチャ管理、メタデータ管理、クエリの解析と最適化を担当するレイヤーはどれですか？",
    "options": [
      { "id": "a", "text": "クラウドサービスレイヤー" },
      { "id": "b", "text": "クエリ処理（コンピュート）レイヤー" },
      { "id": "c", "text": "データベースストレージレイヤー" },
      { "id": "d", "text": "仮想ウェアハウスレイヤー" }
    ],
    "correctOptionIds": ["a"],
    "explanation": "クラウドサービスレイヤーはSnowflakeの「脳」として機能し、認証、インフラ管理、メタデータ管理、クエリの最適化、アクセス制御などの調整サービスを一元的に処理します。これにより、ストレージとコンピュートの分離が可能になります。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/intro-key-concepts"],
    "category": "Architecture",
    "tags": ["Cloud Services", "Metadata"]
  },
  {
    "id": "q2",
    "text": "Snowflakeのマイクロパーティションの特徴として正しい説明はどれですか？",
    "options": [
      { "id": "a", "text": "ユーザーが手動でサイズと構成を定義する必要がある" },
      { "id": "b", "text": "データは非圧縮状態で保存される" },
      { "id": "c", "text": "不変（Immutable）であり、データ変更時は新しいマイクロパーティションが作成される" },
      { "id": "d", "text": "論理的な構造であり、物理ストレージにはマッピングされない" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "マイクロパーティションは50MB〜500MB（非圧縮時）の連続したストレージ単位で、不変（Immutable）です。DML操作でデータが変更されると、既存のパーティションは変更されず、新しいマイクロパーティションが作成されます。これによりTime Travelなどが可能になります。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/tables-clustering-micropartitions"],
    "category": "Architecture",
    "tags": ["Storage", "Micro-partitions"]
  },
  {
    "id": "q3",
    "text": "「マルチクラスターウェアハウス」機能を利用するために必要なSnowflakeの最小エディションはどれですか？",
    "options": [
      { "id": "a", "text": "Standard" },
      { "id": "b", "text": "Enterprise" },
      { "id": "c", "text": "Business Critical" },
      { "id": "d", "text": "Virtual Private Snowflake (VPS)" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "マルチクラスターウェアハウスは、同時実行性が高いワークロードに対して自動的にクラスター数を増減させる機能であり、Enterprise Edition以上で利用可能です。Standard Editionでは利用できません。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/intro-editions"],
    "category": "Account Management",
    "tags": ["Editions", "Multi-cluster Warehouse"]
  },
  {
    "id": "q4",
    "text": "仮想ウェアハウスの「スケーリングポリシー」において、クレジットの節約を優先し、クラスターを起動する前に十分な負荷があるかを確認する設定はどれですか？",
    "options": [
      { "id": "a", "text": "Standard" },
      { "id": "b", "text": "Economy" },
      { "id": "c", "text": "Performance" },
      { "id": "d", "text": "Cost-Optimized" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "マルチクラスターウェアハウスのスケーリングポリシーには「Standard（標準）」と「Economy（エコノミー）」があります。Economyポリシーは、実行中のクラスターでシステムが少なくとも6分間ビジー状態になると予測された場合にのみ、新しいクラスターをスピンアップし、クレジットを節約します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/warehouses-multicluster"],
    "category": "Performance",
    "tags": ["Virtual Warehouse", "Scaling Policy"]
  },
  {
    "id": "q5",
    "text": "Snowflakeにおける「ステージ」の種類のうち、各ユーザーにデフォルトで割り当てられ、他のユーザーからはアクセスできないステージはどれですか？",
    "options": [
      { "id": "a", "text": "名前付き内部ステージ (Named Internal Stage)" },
      { "id": "b", "text": "テーブルステージ (Table Stage)" },
      { "id": "c", "text": "ユーザーステージ (User Stage)" },
      { "id": "d", "text": "外部ステージ (External Stage)" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "ユーザーステージは各ユーザーに自動的に割り当てられ、`@~`で参照されます。このステージは、そのユーザーのみがアクセス可能で、ファイルの一時的な保存やロードに使用されます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-load-local-file-system-create-stage"],
    "category": "Data Loading",
    "tags": ["Stages", "Data Loading"]
  },
  {
    "id": "q6",
    "text": "Snowpipeを使用してデータをロードする際、クラウドストレージからのイベント通知（SQS/SNS/Event Gridなど）を利用してロードをトリガーする機能は何と呼ばれますか？",
    "options": [
      { "id": "a", "text": "REST APIロード" },
      { "id": "b", "text": "Auto-Ingest（自動取り込み）" },
      { "id": "c", "text": "Bulk Loading" },
      { "id": "d", "text": "Continuous Data Protection" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "SnowpipeのAuto-Ingest（自動取り込み）機能は、クラウドストレージ（S3, Azure Blob, GCS）上のイベント通知を利用して、新しいファイルがステージに配置されたことを検知し、自動的にロードを実行します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-load-snowpipe-auto-s3"],
    "category": "Data Loading",
    "tags": ["Snowpipe", "Auto-Ingest"]
  },
  {
    "id": "q7",
    "text": "以下のキャッシュタイプのうち、仮想ウェアハウスが中断（Suspend）されるとクリアされるキャッシュはどれですか？",
    "options": [
      { "id": "a", "text": "メタデータキャッシュ" },
      { "id": "b", "text": "クエリ結果キャッシュ" },
      { "id": "c", "text": "ローカルディスクキャッシュ（ウェアハウスキャッシュ）" },
      { "id": "d", "text": "グローバルサービスキャッシュ" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "ローカルディスクキャッシュ（ウェアハウスキャッシュ）は、仮想ウェアハウスのSSDストレージに保存されます。ウェアハウスが中断されると、コンピュートリソースが解放されるため、このキャッシュはクリアされます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/querying-persisted-results"],
    "category": "Performance",
    "tags": ["Caching", "Virtual Warehouse"]
  },
  {
    "id": "q8",
    "text": "クエリのパフォーマンスを向上させるために、WHERE句のフィルタ条件に基づいて不要なマイクロパーティションのスキャンをスキップするプロセスは何ですか？",
    "options": [
      { "id": "a", "text": "クラスタリング" },
      { "id": "b", "text": "プルーニング（Pruning）" },
      { "id": "c", "text": "インデックススキャン" },
      { "id": "d", "text": "マテリアライズ" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "プルーニングは、クエリ実行時にメタデータ（各マイクロパーティションの最小値・最大値など）を参照し、クエリに関連のないマイクロパーティションを読み込み対象から除外することで、スキャン効率を劇的に向上させる機能です。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/tables-clustering-micropartitions#query-pruning"],
    "category": "Performance",
    "tags": ["Pruning", "Micro-partitions"]
  },
  {
    "id": "q9",
    "text": "アカウントレベルのパラメータ `DATA_RETENTION_TIME_IN_DAYS` のデフォルト値（Standard Edition）は何日ですか？",
    "options": [
      { "id": "a", "text": "0日" },
      { "id": "b", "text": "1日" },
      { "id": "c", "text": "7日" },
      { "id": "d", "text": "90日" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Standard EditionにおけるTime Travelのデータ保持期間（`DATA_RETENTION_TIME_IN_DAYS`）のデフォルトおよび最大値は1日です。Enterprise Edition以上では最大90日まで設定可能です。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-time-travel"],
    "category": "Data Protection",
    "tags": ["Time Travel", "Parameters"]
  },
  {
    "id": "q10",
    "text": "Time Travel期間が終了した直後にデータが移動する、Snowflakeによる災害復旧用の7日間の保護期間は何と呼ばれますか？",
    "options": [
      { "id": "a", "text": "Zero-Copy Clone" },
      { "id": "b", "text": "Fail-safe" },
      { "id": "c", "text": "Time Travel Extended" },
      { "id": "d", "text": "Archival Storage" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Fail-safeはTime Travel期間終了後に開始される7日間の期間で、データの履歴を保護します。ユーザーが直接操作することはできず、極端なデータ損失が発生した場合にSnowflakeサポートのみがデータを復元できます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-failsafe"],
    "category": "Data Protection",
    "tags": ["Fail-safe"]
  },
  {
    "id": "q11",
    "text": "ゼロコピークローン（Zero-Copy Cloning）に関する記述として正しいものはどれですか？",
    "options": [
      { "id": "a", "text": "クローン作成時にすべてのデータが物理的にコピーされるため、ストレージ料金が倍になる" },
      { "id": "b", "text": "クローン作成はメタデータ操作のみであり、作成時点では追加のストレージコストは発生しない" },
      { "id": "c", "text": "クローン元のテーブルとクローン先のテーブルは変更が同期される" },
      { "id": "d", "text": "データベースをクローンすることはできない" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "ゼロコピークローンは、データの物理的なコピーを行わず、元のマイクロパーティションを参照するメタデータのみを作成します。したがって、作成時点では追加ストレージを消費せず高速です。クローン後に変更が加えられたデータのみが独自に保存されます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/object-clone"],
    "category": "Data Protection",
    "tags": ["Cloning"]
  },
  {
    "id": "q12",
    "text": "Snowflakeアカウントを持っていない外部の顧客にデータを共有する場合、プロバイダーが作成すべきアカウントタイプはどれですか？",
    "options": [
      { "id": "a", "text": "コンシューマーアカウント" },
      { "id": "b", "text": "リーダーアカウント（Reader Account）" },
      { "id": "c", "text": "プロキシユーザー" },
      { "id": "d", "text": "ゲストアカウント" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "リーダーアカウントは、Snowflakeアカウントを持たないサードパーティ向けにデータ共有を行うためにプロバイダーが作成・管理するアカウントです。このアカウントのコンピュート使用料はプロバイダーが負担します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-sharing-reader-create"],
    "category": "Data Sharing",
    "tags": ["Reader Accounts", "Data Sharing"]
  },
  {
    "id": "q13",
    "text": "ユーザーやロールの作成・管理を行う権限を持ち、`MANAGE GRANTS` 権限を保持するシステム定義ロールはどれですか？",
    "options": [
      { "id": "a", "text": "SYSADMIN" },
      { "id": "b", "text": "USERADMIN" },
      { "id": "c", "text": "SECURITYADMIN" },
      { "id": "d", "text": "PUBLIC" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "SECURITYADMINロールは、ユーザーやロールの作成・管理に加え、`MANAGE GRANTS`権限を持っており、アカウント内のあらゆるアクセス制御の付与（GRANT）を管理できます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/security-access-control-overview"],
    "category": "Security",
    "tags": ["RBAC", "Roles"]
  },
  {
    "id": "q14",
    "text": "ネットワークポリシーにおいて、アクセスを許可またはブロックするために使用できる識別子は何ですか？",
    "options": [
      { "id": "a", "text": "MACアドレス" },
      { "id": "b", "text": "IPアドレス（IPv4）" },
      { "id": "c", "text": "ユーザー名" },
      { "id": "d", "text": "ブラウザの種類" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Snowflakeのネットワークポリシーは、許可リストとブロックリストを使用して、特定のIPv4アドレスまたはCIDRブロックからのアクセスを制限します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/network-policies"],
    "category": "Security",
    "tags": ["Network Policies", "Security"]
  },
  {
    "id": "q15",
    "text": "多要素認証（MFA）を有効にするために、ユーザーがスマートフォンにインストールする必要があるアプリケーションはどれですか？",
    "options": [
      { "id": "a", "text": "Google Authenticator" },
      { "id": "b", "text": "Duo Mobile" },
      { "id": "c", "text": "Microsoft Authenticator" },
      { "id": "d", "text": "Okta Verify" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "SnowflakeのMFA機能はDuo Securityによって提供されており、ユーザーはDuo Mobileアプリを使用して認証を行うことが推奨・統合されています。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/security-mfa"],
    "category": "Security",
    "tags": ["MFA", "Security"]
  },
  {
    "id": "q16",
    "text": "JSON、Avro、Parquetなどの半構造化データをSnowflakeテーブルにロードする際に推奨されるデータ型はどれですか？",
    "options": [
      { "id": "a", "text": "VARCHAR" },
      { "id": "b", "text": "BLOB" },
      { "id": "c", "text": "VARIANT" },
      { "id": "d", "text": "XML" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "VARIANTデータ型は、JSON、Avro、ORC、Parquetなどの半構造化データをそのままの階層構造で格納するために設計されたSnowflake固有のデータ型です。最大16MBまで格納可能です。",
    "urls": ["https://docs.snowflake.com/ja/sql-reference/data-types-semistructured"],
    "category": "Data Types",
    "tags": ["Semi-structured Data", "VARIANT"]
  },
  {
    "id": "q17",
    "text": "リソースモニターを使用して制御できるのは次のうちどれですか？",
    "options": [
      { "id": "a", "text": "ストレージ使用量" },
      { "id": "b", "text": "ユーザーの同時接続数" },
      { "id": "c", "text": "仮想ウェアハウスのクレジット消費量" },
      { "id": "d", "text": "クラウドサービスレイヤーのコスト" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "リソースモニターは、仮想ウェアハウスによるクレジット消費（コンピュートコスト）を監視し、設定されたクォータ（上限）に達した場合にアラート送信やウェアハウスの停止を行います。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/resource-monitors"],
    "category": "Account Management",
    "tags": ["Resource Monitors", "Cost Management"]
  },
  {
    "id": "q18",
    "text": "Snowflakeの仮想ウェアハウスのサイズを変更（スケールアップ/ダウン）する際の特徴として正しいものはどれですか？",
    "options": [
      { "id": "a", "text": "ウェアハウスを一度停止（Suspend）する必要がある" },
      { "id": "b", "text": "実行中のクエリも含めて即座にリソースが割り当てられる" },
      { "id": "c", "text": "ウェアハウスを停止することなく実行中にサイズ変更が可能で、新しいサイズは後続のクエリに適用される" },
      { "id": "d", "text": "サイズ変更には管理者（ACCOUNTADMIN）の承認が必要である" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "仮想ウェアハウスのサイズ変更は、ウェアハウスが稼働中でも実行可能です。ただし、変更は新しく投入されるクエリに対して有効になり、現在実行中のクエリは変更前のリソースで完了します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/warehouses-considerations"],
    "category": "Performance",
    "tags": ["Virtual Warehouse", "Scaling"]
  },
  {
    "id": "q19",
    "text": "データロード時の変換処理（Transform during load）として、`COPY INTO` コマンドで実行**できない**操作はどれですか？",
    "options": [
      { "id": "a", "text": "列の並べ替え" },
      { "id": "b", "text": "データ型のキャスト" },
      { "id": "c", "text": "WHERE句によるフィルタリング" },
      { "id": "d", "text": "JOIN句を使用した他のテーブルとの結合" }
    ],
    "correctOptionIds": ["d"],
    "explanation": "`COPY INTO` コマンドでのデータロード中には、列の並べ替え、省略、キャスト、文字列の切り捨てなどの単純な変換はサポートされていますが、JOIN句を使用した結合や、集計（SUM, GROUP BY）はサポートされていません。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-load-transform"],
    "category": "Data Loading",
    "tags": ["COPY INTO", "Transformation"]
  },
  {
    "id": "q20",
    "text": "クエリのパフォーマンスを分析するために、過去1年間のクエリ履歴を確認したい場合、どのスキーマを使用すべきですか？",
    "options": [
      { "id": "a", "text": "INFORMATION_SCHEMA" },
      { "id": "b", "text": "SNOWFLAKE.ACCOUNT_USAGE" },
      { "id": "c", "text": "PUBLIC" },
      { "id": "d", "text": "SYSADMIN" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "`SNOWFLAKE.ACCOUNT_USAGE` スキーマは最大365日（1年間）の履歴データを保持します。一方、`INFORMATION_SCHEMA` は通常、過去7日〜14日分（ビューによる）のデータしか保持しません。",
    "urls": ["https://docs.snowflake.com/ja/sql-reference/account-usage/query_history"],
    "category": "Account Management",
    "tags": ["Account Usage", "Monitoring"]
  },
  {
    "id": "q21",
    "text": "「検索最適化サービス（Search Optimization Service）」が最も効果を発揮するクエリパターンはどれですか？",
    "options": [
      { "id": "a", "text": "大量のデータを集計するクエリ" },
      { "id": "b", "text": "テーブル全体のスキャンが必要なクエリ" },
      { "id": "c", "text": "特定の値を検索するポイントルックアップクエリ（Needle in a haystack）" },
      { "id": "d", "text": "複雑な結合を含むクエリ" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "検索最適化サービスは、大量のデータの中から特定の値をフィルタリングして返す「ポイントルックアップクエリ（干し草の山から針を探すようなクエリ）」のパフォーマンスを大幅に向上させるために設計されています。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/search-optimization-service"],
    "category": "Performance",
    "tags": ["Search Optimization"]
  },
  {
    "id": "q22",
    "text": "マテリアライズドビュー（Materialized View）の主な利点は何ですか？",
    "options": [
      { "id": "a", "text": "リアルタイムデータの書き込み速度を向上させる" },
      { "id": "b", "text": "頻繁に実行される集計クエリの結果を事前計算して保存し、クエリ応答時間を短縮する" },
      { "id": "c", "text": "ストレージコストをゼロにする" },
      { "id": "d", "text": "任意のSQL（結合や複雑なサブクエリを含む）をサポートする" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "マテリアライズドビューは、クエリ結果を事前に計算して保存しておくことで、同じ集計やフィルタリングを行うクエリのパフォーマンスを向上させます。バックグラウンドで自動的にメンテナンスされます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/views-materialized"],
    "category": "Performance",
    "tags": ["Materialized Views"]
  },
  {
    "id": "q23",
    "text": "Snowflakeパートナー（BIツールやETLツールなど）とのトライアルアカウント連携を数クリックですばやく開始できる機能はどれですか？",
    "options": [
      { "id": "a", "text": "Data Exchange" },
      { "id": "b", "text": "Partner Connect" },
      { "id": "c", "text": "Snowgrid" },
      { "id": "d", "text": "Marketplace" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Partner Connectを使用すると、Snowflakeアカウント内から直接、選択したパートナー（Informatica, Fivetran, Tableauなど）のトライアルアカウントを作成し、自動的に接続設定を行うことができます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/ecosystem-partner-connect"],
    "category": "Ecosystem",
    "tags": ["Partner Connect"]
  },
  {
    "id": "q24",
    "text": "外部テーブル（External Table）の主な用途として適切なものはどれですか？",
    "options": [
      { "id": "a", "text": "Snowflake内部ストレージにデータをロードして高速分析する" },
      { "id": "b", "text": "データをSnowflakeにロードせずに、クラウドストレージ上のファイル（データレイク）に直接クエリを実行する" },
      { "id": "c", "text": "OLTPワークロードを処理する" },
      { "id": "d", "text": "一時的なデータを保存する" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "外部テーブルは、S3やAzure Blobなどの外部クラウドストレージにあるファイルに対して、データをSnowflake内に取り込むことなく直接クエリを実行できる機能です（スキーマオンリード）。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/tables-external-intro"],
    "category": "Data Loading",
    "tags": ["External Tables"]
  },
  {
    "id": "q25",
    "text": "Snowflakeにおける「ダイナミックテーブル（Dynamic Table）」の主な目的は何ですか？",
    "options": [
      { "id": "a", "text": "データの長期アーカイブ" },
      { "id": "b", "text": "宣言的なSQLを使用して、信頼性の高いデータ変換パイプラインを構築する" },
      { "id": "c", "text": "外部パートナーとのデータ共有" },
      { "id": "d", "text": "非構造化データの保存" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "ダイナミックテーブルは、`CREATE DYNAMIC TABLE ... AS SELECT`という宣言的なSQLを使用して、ターゲットとなるテーブルの状態を定義します。Snowflakeは自動的にリフレッシュを管理し、データパイプラインの構築を簡素化します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/dynamic-tables-intro"],
    "category": "Data Engineering",
    "tags": ["Dynamic Tables"]
  },
  {
    "id": "q26",
    "text": "クラウドストレージ上の非構造化データ（画像やPDFなど）のファイルURLやメタデータをカタログ化し、クエリ可能にする機能はどれですか？",
    "options": [
      { "id": "a", "text": "ディレクトリテーブル（Directory Table）" },
      { "id": "b", "text": "テンポラリテーブル" },
      { "id": "c", "text": "ストリーム" },
      { "id": "d", "text": "ファイルフォーマット" }
    ],
    "correctOptionIds": ["a"],
    "explanation": "ディレクトリテーブルは、ステージ上のファイル（非構造化データを含む）のカタログとして機能し、ファイル名、サイズ、更新日時、URLなどのメタデータをクエリ可能な形式で提供します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-load-dirtables"],
    "category": "Unstructured Data",
    "tags": ["Directory Tables"]
  },
  {
    "id": "q27",
    "text": "列レベルのセキュリティ機能で、権限のないユーザーに対してデータを隠蔽（例：メールアドレスの一部をアスタリスクにする）する機能は何ですか？",
    "options": [
      { "id": "a", "text": "行アクセスポリシー" },
      { "id": "b", "text": "ダイナミックデータマスキング" },
      { "id": "c", "text": "ネットワークポリシー" },
      { "id": "d", "text": "リソースモニター" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "ダイナミックデータマスキングは、クエリ実行時にユーザーのロールや権限に基づいて、列の値を動的にマスク（隠蔽または難読化）する機能です。元のデータは変更されません。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/security-column-ddm-intro"],
    "category": "Security",
    "tags": ["Data Masking", "Governance"]
  },
  {
    "id": "q28",
    "text": "Snowflakeにおける「順序（Sequence）」オブジェクトの主な用途は何ですか？",
    "options": [
      { "id": "a", "text": "クエリの実行順序を制御する" },
      { "id": "b", "text": "タスクの依存関係を定義する" },
      { "id": "c", "text": "テーブルの主キーなどに使用する一意の数値を生成する" },
      { "id": "d", "text": "データのソート順を強制する" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "シーケンスは、一意の数値を生成するために使用されるファーストクラスのオブジェクトです。主にテーブルのプライマリキー（代理キー）の値を生成するために使用されます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/querying-sequences"],
    "category": "Database Objects",
    "tags": ["Sequences"]
  },
  {
    "id": "q29",
    "text": "Snowflakeの請求において、コンピュートコスト（仮想ウェアハウス）はどのような単位で課金されますか？",
    "options": [
      { "id": "a", "text": "クエリ数単位" },
      { "id": "b", "text": "スキャンされたデータ量（バイト）単位" },
      { "id": "c", "text": "ウェアハウスが稼働している時間（秒単位、最低1分）" },
      { "id": "d", "text": "月額固定料金" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "仮想ウェアハウスは、稼働している時間に対してクレジットを消費します。課金は秒単位で行われますが、ウェアハウスを起動（または再開）するたびに最低1分間の料金が発生します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/warehouses-considerations#warehouse-credit-usage"],
    "category": "Account Management",
    "tags": ["Billing", "Virtual Warehouse"]
  },
  {
    "id": "q30",
    "text": "Python、Java、Scalaなどのコードを使用して、Snowflake内でデータ処理パイプラインやMLモデルを構築・実行できる開発者向けフレームワークは何ですか？",
    "options": [
      { "id": "a", "text": "Snowpipe" },
      { "id": "b", "text": "Snowpark" },
      { "id": "c", "text": "SnowSQL" },
      { "id": "d", "text": "Snowgrid" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Snowparkは、SQL以外の言語（Python, Java, Scala）を使用して、Snowflakeの弾力的な処理エンジンの上で直接データ処理コードを記述・実行できるライブラリおよびランタイムです。",
    "urls": ["https://docs.snowflake.com/ja/developer-guide/snowpark/index"],
    "category": "Development",
    "tags": ["Snowpark"]
  },
  {
    "id": "q1",
    "text": "Snowflakeのアーキテクチャにおいて、認証、インフラストラクチャ管理、メタデータ管理、およびクエリの最適化を担当するレイヤーはどれですか？",
    "options": [
      { "id": "a", "text": "クラウドサービスレイヤー" },
      { "id": "b", "text": "クエリ処理（コンピュート）レイヤー" },
      { "id": "c", "text": "データベースストレージレイヤー" },
      { "id": "d", "text": "仮想ウェアハウスレイヤー" }
    ],
    "correctOptionIds": ["a"],
    "explanation": "クラウドサービスレイヤーはSnowflakeの「脳」として機能し、認証、インフラストラクチャ管理、メタデータ管理、クエリの解析と最適化、アクセス制御などの調整サービスを一元的に処理します。このレイヤーは、すべてのSnowflakeアカウント間で共有されるステートレスなコンピュートリソースで構成されています。",
    "urls": ["https://docs.snowflake.com/en/user-guide/intro-key-concepts"],
    "category": "Architecture",
    "tags": ["Cloud Services", "Metadata"]
  },
  {
    "id": "q2",
    "text": "Snowflakeのマイクロパーティションの特徴として正しい説明はどれですか？",
    "options": [
      { "id": "a", "text": "ユーザーが手動でサイズと構成を定義する必要がある" },
      { "id": "b", "text": "データは非圧縮状態で保存される" },
      { "id": "c", "text": "不変（Immutable）であり、データ変更時は新しいマイクロパーティションが作成される" },
      { "id": "d", "text": "論理的な構造であり、物理ストレージにはマッピングされない" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "マイクロパーティションは50MB〜500MB（非圧縮時）の連続したストレージ単位で、不変（Immutable）です。DML操作でデータが変更されると、既存のパーティションは変更されず、新しいマイクロパーティションが作成されます。これによりTime Travelやクローニングが可能になります。",
    "urls": ["https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions"],
    "category": "Architecture",
    "tags": ["Storage", "Micro-partitions"]
  },
  {
    "id": "q3",
    "text": "「マルチクラスターウェアハウス」機能を利用するために必要なSnowflakeの最小エディションはどれですか？",
    "options": [
      { "id": "a", "text": "Standard" },
      { "id": "b", "text": "Enterprise" },
      { "id": "c", "text": "Business Critical" },
      { "id": "d", "text": "Virtual Private Snowflake (VPS)" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "マルチクラスターウェアハウスは、同時実行性が高いワークロードに対して自動的にクラスター数を増減させる機能であり、Enterprise Edition以上で利用可能です。Standard Editionでは利用できません。",
    "urls": ["https://docs.snowflake.com/en/user-guide/intro-editions"],
    "category": "Account Management",
    "tags": ["Editions", "Multi-cluster Warehouse"]
  },
  {
    "id": "q4",
    "text": "仮想ウェアハウスの「スケーリングポリシー」において、クレジットの節約を優先し、クラスターを起動する前に十分な負荷があるかを確認する設定はどれですか？",
    "options": [
      { "id": "a", "text": "Standard" },
      { "id": "b", "text": "Economy" },
      { "id": "c", "text": "Performance" },
      { "id": "d", "text": "Cost-Optimized" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "マルチクラスターウェアハウスのスケーリングポリシーには「Standard（標準）」と「Economy（エコノミー）」があります。Economyポリシーは、実行中のクラスターでシステムが少なくとも6分間ビジー状態になると予測された場合にのみ、新しいクラスターをスピンアップし、クレジットを節約します。",
    "urls": ["https://docs.snowflake.com/en/user-guide/warehouses-multicluster"],
    "category": "Performance",
    "tags": ["Virtual Warehouse", "Scaling Policy"]
  },
  {
    "id": "q5",
    "text": "Snowflakeにおける「ステージ」の種類のうち、各ユーザーにデフォルトで割り当てられ、他のユーザーからはアクセスできないステージはどれですか？",
    "options": [
      { "id": "a", "text": "名前付き内部ステージ (Named Internal Stage)" },
      { "id": "b", "text": "テーブルステージ (Table Stage)" },
      { "id": "c", "text": "ユーザーステージ (User Stage)" },
      { "id": "d", "text": "外部ステージ (External Stage)" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "ユーザーステージは各ユーザーに自動的に割り当てられ、`@~`で参照されます。このステージは、そのユーザーのみがアクセス可能で、ファイルの一時的な保存やロードに使用されます。",
    "urls": ["https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage"],
    "category": "Data Loading",
    "tags": ["Stages", "Data Loading"]
  },
  {
    "id": "q6",
    "text": "Snowpipeを使用してデータをロードする際、クラウドストレージからのイベント通知（SQS/SNS/Event Gridなど）を利用してロードをトリガーする機能は何と呼ばれますか？",
    "options": [
      { "id": "a", "text": "REST APIロード" },
      { "id": "b", "text": "Auto-Ingest（自動取り込み）" },
      { "id": "c", "text": "Bulk Loading" },
      { "id": "d", "text": "Continuous Data Protection" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "SnowpipeのAuto-Ingest（自動取り込み）機能は、クラウドストレージ（S3, Azure Blob, GCS）上のイベント通知を利用して、新しいファイルがステージに配置されたことを検知し、自動的にロードを実行します。",
    "urls": ["https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3"],
    "category": "Data Loading",
    "tags": ["Snowpipe", "Auto-Ingest"]
  },
  {
    "id": "q7",
    "text": "以下のキャッシュタイプのうち、仮想ウェアハウスが中断（Suspend）されるとクリアされるキャッシュはどれですか？",
    "options": [
      { "id": "a", "text": "メタデータキャッシュ" },
      { "id": "b", "text": "クエリ結果キャッシュ" },
      { "id": "c", "text": "ローカルディスクキャッシュ（ウェアハウスキャッシュ/データキャッシュ）" },
      { "id": "d", "text": "グローバルサービスキャッシュ" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "ローカルディスクキャッシュ（データキャッシュ）は、仮想ウェアハウスのSSDストレージに保存されます。ウェアハウスが中断されると、コンピュートリソースが解放されるため、このキャッシュはクリアされます。一方、クエリ結果キャッシュはクラウドサービスレイヤーに24時間保持されます。",
    "urls": ["https://docs.snowflake.com/en/user-guide/querying-persisted-results"],
    "category": "Performance",
    "tags": ["Caching", "Virtual Warehouse"]
  },
  {
    "id": "q8",
    "text": "クエリのパフォーマンスを向上させるために、WHERE句のフィルタ条件に基づいて不要なマイクロパーティションのスキャンをスキップするプロセスは何ですか？",
    "options": [
      { "id": "a", "text": "クラスタリング" },
      { "id": "b", "text": "プルーニング（Pruning）" },
      { "id": "c", "text": "インデックススキャン" },
      { "id": "d", "text": "マテリアライズ" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "プルーニングは、クエリ実行時にメタデータ（各マイクロパーティションの最小値・最大値など）を参照し、クエリに関連のないマイクロパーティションを読み込み対象から除外することで、スキャン効率を劇的に向上させる機能です。",
    "urls": ["https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions#query-pruning"],
    "category": "Performance",
    "tags": ["Pruning", "Micro-partitions"]
  },
  {
    "id": "q9",
    "text": "Standard EditionにおけるTime Travelのデータ保持期間（`DATA_RETENTION_TIME_IN_DAYS`）の最大値は何日ですか？",
    "options": [
      { "id": "a", "text": "0日" },
      { "id": "b", "text": "1日" },
      { "id": "c", "text": "7日" },
      { "id": "d", "text": "90日" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Standard EditionにおけるTime Travelのデータ保持期間（`DATA_RETENTION_TIME_IN_DAYS`）のデフォルトおよび最大値は1日です。Enterprise Edition以上では最大90日まで設定可能です。",
    "urls": ["https://docs.snowflake.com/en/user-guide/data-time-travel"],
    "category": "Data Protection",
    "tags": ["Time Travel", "Parameters"]
  },
  {
    "id": "q10",
    "text": "Time Travel期間が終了した直後にデータが移動する、Snowflakeによる災害復旧用の7日間の保護期間は何と呼ばれますか？",
    "options": [
      { "id": "a", "text": "Zero-Copy Clone" },
      { "id": "b", "text": "Fail-safe" },
      { "id": "c", "text": "Time Travel Extended" },
      { "id": "d", "text": "Archival Storage" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Fail-safeはTime Travel期間終了後に開始される7日間の期間で、データの履歴を保護します。ユーザーが直接操作することはできず、極端なデータ損失が発生した場合にSnowflakeサポートのみがデータを復元できます。",
    "urls": ["https://docs.snowflake.com/en/user-guide/data-failsafe"],
    "category": "Data Protection",
    "tags": ["Fail-safe"]
  },
  {
    "id": "q11",
    "text": "ゼロコピークローン（Zero-Copy Cloning）に関する記述として正しいものはどれですか？",
    "options": [
      { "id": "a", "text": "クローン作成時にすべてのデータが物理的にコピーされるため、ストレージ料金が倍になる" },
      { "id": "b", "text": "クローン作成はメタデータ操作のみであり、作成時点では追加のストレージコストは発生しない" },
      { "id": "c", "text": "クローン元のテーブルとクローン先のテーブルは変更が同期される" },
      { "id": "d", "text": "データベースをクローンすることはできない" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "ゼロコピークローンは、データの物理的なコピーを行わず、元のマイクロパーティションを参照するメタデータのみを作成します。したがって、作成時点では追加ストレージを消費せず高速です。クローン後に変更が加えられたデータのみが独自に保存されます。",
    "urls": ["https://docs.snowflake.com/en/user-guide/object-clone"],
    "category": "Data Protection",
    "tags": ["Cloning"]
  },
  {
    "id": "q12",
    "text": "Snowflakeアカウントを持っていない外部の顧客にデータを共有する場合、プロバイダーが作成すべきアカウントタイプはどれですか？",
    "options": [
      { "id": "a", "text": "コンシューマーアカウント" },
      { "id": "b", "text": "リーダーアカウント（Reader Account）" },
      { "id": "c", "text": "プロキシユーザー" },
      { "id": "d", "text": "ゲストアカウント" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "リーダーアカウントは、Snowflakeアカウントを持たないサードパーティ向けにデータ共有を行うためにプロバイダーが作成・管理するアカウントです。このアカウントのコンピュート使用料はプロバイダーが負担します。",
    "urls": ["https://docs.snowflake.com/en/user-guide/data-sharing-reader-create"],
    "category": "Data Sharing",
    "tags": ["Reader Accounts", "Data Sharing"]
  },
  {
    "id": "q13",
    "text": "ユーザーやロールの作成・管理を行う権限を持ち、`MANAGE GRANTS` 権限を保持するシステム定義ロールはどれですか？",
    "options": [
      { "id": "a", "text": "SYSADMIN" },
      { "id": "b", "text": "USERADMIN" },
      { "id": "c", "text": "SECURITYADMIN" },
      { "id": "d", "text": "PUBLIC" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "SECURITYADMINロールは、ユーザーやロールの作成・管理に加え、`MANAGE GRANTS`権限を持っており、アカウント内のあらゆるアクセス制御の付与（GRANT）を管理できます。USERADMINはユーザーとロールの作成はできますが、MANAGE GRANTS権限は持ちません。",
    "urls": ["https://docs.snowflake.com/en/user-guide/security-access-control-overview"],
    "category": "Security",
    "tags": ["RBAC", "Roles"]
  },
  {
    "id": "q14",
    "text": "ネットワークポリシーにおいて、アクセスを許可またはブロックするために使用できる識別子は何ですか？",
    "options": [
      { "id": "a", "text": "MACアドレス" },
      { "id": "b", "text": "IPアドレス（IPv4）" },
      { "id": "c", "text": "ユーザー名" },
      { "id": "d", "text": "ブラウザの種類" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Snowflakeのネットワークポリシーは、許可リストとブロックリストを使用して、特定のIPv4アドレスまたはCIDRブロックからのアクセスを制限します。ネットワークルールを使用すると、他の識別子（AWS VPCE IDなど）もサポートされます。",
    "urls": ["https://docs.snowflake.com/en/user-guide/network-policies"],
    "category": "Security",
    "tags": ["Network Policies", "Security"]
  },
  {
    "id": "q15",
    "text": "多要素認証（MFA）を有効にするために、ユーザーがスマートフォンにインストールすることが推奨されるアプリケーションはどれですか？",
    "options": [
      { "id": "a", "text": "Google Authenticator" },
      { "id": "b", "text": "Duo Mobile" },
      { "id": "c", "text": "Microsoft Authenticator" },
      { "id": "d", "text": "Okta Verify" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "SnowflakeのMFA機能はDuo Securityによって提供されており、ユーザーはDuo Mobileアプリを使用して認証を行うことが推奨・統合されています。",
    "urls": ["https://docs.snowflake.com/en/user-guide/security-mfa"],
    "category": "Security",
    "tags": ["MFA", "Security"]
  },
  {
    "id": "q16",
    "text": "JSON、Avro、Parquetなどの半構造化データをSnowflakeテーブルにロードする際に使用されるデータ型はどれですか？",
    "options": [
      { "id": "a", "text": "VARCHAR" },
      { "id": "b", "text": "BLOB" },
      { "id": "c", "text": "VARIANT" },
      { "id": "d", "text": "XML" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "VARIANTデータ型は、JSON、Avro、ORC、Parquetなどの半構造化データをそのままの階層構造で格納するために設計されたSnowflake固有のデータ型です。最大16MBまで格納可能です。",
    "urls": ["https://docs.snowflake.com/en/sql-reference/data-types-semistructured"],
    "category": "Data Types",
    "tags": ["Semi-structured Data", "VARIANT"]
  },
  {
    "id": "q17",
    "text": "リソースモニターを使用して制御できるのは次のうちどれですか？",
    "options": [
      { "id": "a", "text": "ストレージ使用量" },
      { "id": "b", "text": "ユーザーの同時接続数" },
      { "id": "c", "text": "仮想ウェアハウスのクレジット消費量" },
      { "id": "d", "text": "クラウドサービスレイヤーのコスト" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "リソースモニターは、仮想ウェアハウスによるクレジット消費（コンピュートコスト）を監視し、設定されたクォータ（上限）に達した場合にアラート送信やウェアハウスの停止を行います。",
    "urls": ["https://docs.snowflake.com/en/user-guide/resource-monitors"],
    "category": "Account Management",
    "tags": ["Resource Monitors", "Cost Management"]
  },
  {
    "id": "q18",
    "text": "Snowflakeの仮想ウェアハウスのサイズを変更（スケールアップ）する際の特徴として正しいものはどれですか？",
    "options": [
      { "id": "a", "text": "ウェアハウスを一度停止（Suspend）する必要がある" },
      { "id": "b", "text": "実行中のクエリも含めて即座にリソースが割り当てられる" },
      { "id": "c", "text": "ウェアハウスを停止することなく実行中にサイズ変更が可能で、新しいサイズは後続のクエリに適用される" },
      { "id": "d", "text": "サイズ変更には管理者（ACCOUNTADMIN）の承認が必要である" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "仮想ウェアハウスのサイズ変更は、ウェアハウスが稼働中でも実行可能です。ただし、変更は新しく投入されるクエリに対して有効になり、現在実行中のクエリは変更前のリソースで完了します。",
    "urls": ["https://docs.snowflake.com/en/user-guide/warehouses-considerations"],
    "category": "Performance",
    "tags": ["Virtual Warehouse", "Scaling"]
  },
  {
    "id": "q19",
    "text": "データロード時の変換処理（Transform during load）として、`COPY INTO` コマンドで実行**できない**操作はどれですか？",
    "options": [
      { "id": "a", "text": "列の並べ替え" },
      { "id": "b", "text": "データ型のキャスト" },
      { "id": "c", "text": "WHERE句によるフィルタリング" },
      { "id": "d", "text": "JOIN句を使用した他のテーブルとの結合" }
    ],
    "correctOptionIds": ["d"],
    "explanation": "`COPY INTO` コマンドでのデータロード中には、列の並べ替え、省略、キャスト、文字列の切り捨てなどの単純な変換はサポートされていますが、JOIN句を使用した結合や、集計（SUM, GROUP BY）はサポートされていません。",
    "urls": ["https://docs.snowflake.com/en/user-guide/data-load-transform"],
    "category": "Data Loading",
    "tags": ["COPY INTO", "Transformation"]
  },
  {
    "id": "q20",
    "text": "クエリのパフォーマンスを分析するために、過去1年間のクエリ履歴を確認したい場合、どのスキーマを使用すべきですか？",
    "options": [
      { "id": "a", "text": "INFORMATION_SCHEMA" },
      { "id": "b", "text": "SNOWFLAKE.ACCOUNT_USAGE" },
      { "id": "c", "text": "PUBLIC" },
      { "id": "d", "text": "SYSADMIN" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "`SNOWFLAKE.ACCOUNT_USAGE` スキーマは最大365日（1年間）の履歴データを保持します。一方、`INFORMATION_SCHEMA` は通常、過去7日〜6ヶ月分（ビューによる）のデータしか保持しません（QUERY_HISTORYテーブル関数は7日間）。",
    "urls": ["https://docs.snowflake.com/en/sql-reference/account-usage/query_history"],
    "category": "Account Management",
    "tags": ["Account Usage", "Monitoring"]
  },
  {
    "id": "q21",
    "text": "「検索最適化サービス（Search Optimization Service）」が最も効果を発揮するクエリパターンはどれですか？",
    "options": [
      { "id": "a", "text": "大量のデータを集計するクエリ" },
      { "id": "b", "text": "テーブル全体のスキャンが必要なクエリ" },
      { "id": "c", "text": "特定の値を検索するポイントルックアップクエリ（Needle in a haystack）" },
      { "id": "d", "text": "複雑な結合を含むクエリ" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "検索最適化サービスは、大量のデータの中から特定の値をフィルタリングして返す「ポイントルックアップクエリ（干し草の山から針を探すようなクエリ）」のパフォーマンスを大幅に向上させるために設計されています。",
    "urls": ["https://docs.snowflake.com/en/user-guide/search-optimization-service"],
    "category": "Performance",
    "tags": ["Search Optimization"]
  },
  {
    "id": "q22",
    "text": "マテリアライズドビュー（Materialized View）の主な利点は何ですか？",
    "options": [
      { "id": "a", "text": "リアルタイムデータの書き込み速度を向上させる" },
      { "id": "b", "text": "頻繁に実行される集計クエリの結果を事前計算して保存し、クエリ応答時間を短縮する" },
      { "id": "c", "text": "ストレージコストをゼロにする" },
      { "id": "d", "text": "任意のSQL（結合や複雑なサブクエリを含む）をサポートする" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "マテリアライズドビューは、クエリ結果を事前に計算して保存しておくことで、同じ集計やフィルタリングを行うクエリのパフォーマンスを向上させます。バックグラウンドで自動的にメンテナンスされます。",
    "urls": ["https://docs.snowflake.com/en/user-guide/views-materialized"],
    "category": "Performance",
    "tags": ["Materialized Views"]
  },
  {
    "id": "q23",
    "text": "Snowflakeパートナー（BIツールやETLツールなど）とのトライアルアカウント連携を数クリックですばやく開始できる機能はどれですか？",
    "options": [
      { "id": "a", "text": "Data Exchange" },
      { "id": "b", "text": "Partner Connect" },
      { "id": "c", "text": "Snowgrid" },
      { "id": "d", "text": "Marketplace" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Partner Connectを使用すると、Snowflakeアカウント内から直接、選択したパートナー（Informatica, Fivetran, Tableauなど）のトライアルアカウントを作成し、自動的に接続設定を行うことができます。",
    "urls": ["https://docs.snowflake.com/en/user-guide/ecosystem-partner-connect"],
    "category": "Ecosystem",
    "tags": ["Partner Connect"]
  },
  {
    "id": "q24",
    "text": "外部テーブル（External Table）の主な用途として適切なものはどれですか？",
    "options": [
      { "id": "a", "text": "Snowflake内部ストレージにデータをロードして高速分析する" },
      { "id": "b", "text": "データをSnowflakeにロードせずに、クラウドストレージ上のファイル（データレイク）に直接クエリを実行する" },
      { "id": "c", "text": "OLTPワークロードを処理する" },
      { "id": "d", "text": "一時的なデータを保存する" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "外部テーブルは、S3やAzure Blobなどの外部クラウドストレージにあるファイルに対して、データをSnowflake内に取り込むことなく直接クエリを実行できる機能です（スキーマオンリード）。",
    "urls": ["https://docs.snowflake.com/en/user-guide/tables-external-intro"],
    "category": "Data Loading",
    "tags": ["External Tables"]
  },
  {
    "id": "q25",
    "text": "Snowflakeにおける「ダイナミックテーブル（Dynamic Table）」の主な目的は何ですか？",
    "options": [
      { "id": "a", "text": "データの長期アーカイブ" },
      { "id": "b", "text": "宣言的なSQLを使用して、信頼性の高いデータ変換パイプラインを構築する" },
      { "id": "c", "text": "外部パートナーとのデータ共有" },
      { "id": "d", "text": "非構造化データの保存" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "ダイナミックテーブルは、`CREATE DYNAMIC TABLE ... AS SELECT`という宣言的なSQLを使用して、ターゲットとなるテーブルの状態を定義します。Snowflakeは自動的にリフレッシュを管理し、データパイプラインの構築を簡素化します。",
    "urls": ["https://docs.snowflake.com/en/user-guide/dynamic-tables-intro"],
    "category": "Data Engineering",
    "tags": ["Dynamic Tables"]
  },
  {
    "id": "q26",
    "text": "クラウドストレージ上の非構造化データ（画像やPDFなど）のファイルURLやメタデータをカタログ化し、クエリ可能にする機能はどれですか？",
    "options": [
      { "id": "a", "text": "ディレクトリテーブル（Directory Table）" },
      { "id": "b", "text": "テンポラリテーブル" },
      { "id": "c", "text": "ストリーム" },
      { "id": "d", "text": "ファイルフォーマット" }
    ],
    "correctOptionIds": ["a"],
    "explanation": "ディレクトリテーブルは、ステージ上のファイル（非構造化データを含む）のカタログとして機能し、ファイル名、サイズ、更新日時、URLなどのメタデータをクエリ可能な形式で提供します。",
    "urls": ["https://docs.snowflake.com/en/user-guide/data-load-dirtables"],
    "category": "Unstructured Data",
    "tags": ["Directory Tables"]
  },
  {
    "id": "q27",
    "text": "列レベルのセキュリティ機能で、権限のないユーザーに対してデータを隠蔽（例：メールアドレスの一部をアスタリスクにする）する機能は何ですか？",
    "options": [
      { "id": "a", "text": "行アクセスポリシー" },
      { "id": "b", "text": "ダイナミックデータマスキング" },
      { "id": "c", "text": "ネットワークポリシー" },
      { "id": "d", "text": "リソースモニター" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "ダイナミックデータマスキングは、クエリ実行時にユーザーのロールや権限に基づいて、列の値を動的にマスク（隠蔽または難読化）する機能です。元のデータは変更されません。",
    "urls": ["https://docs.snowflake.com/en/user-guide/security-column-ddm-intro"],
    "category": "Security",
    "tags": ["Data Masking", "Governance"]
  },
  {
    "id": "q28",
    "text": "Snowflakeにおける「順序（Sequence）」オブジェクトの主な用途は何ですか？",
    "options": [
      { "id": "a", "text": "クエリの実行順序を制御する" },
      { "id": "b", "text": "タスクの依存関係を定義する" },
      { "id": "c", "text": "テーブルの主キーなどに使用する一意の数値を生成する" },
      { "id": "d", "text": "データのソート順を強制する" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "シーケンスは、一意の数値を生成するために使用されるファーストクラスのオブジェクトです。主にテーブルのプライマリキー（代理キー）の値を生成するために使用されます。",
    "urls": ["https://docs.snowflake.com/en/user-guide/querying-sequences"],
    "category": "Database Objects",
    "tags": ["Sequences"]
  },
  {
    "id": "q29",
    "text": "Snowflakeの請求において、コンピュートコスト（仮想ウェアハウス）はどのような単位で課金されますか？",
    "options": [
      { "id": "a", "text": "クエリ数単位" },
      { "id": "b", "text": "スキャンされたデータ量（バイト）単位" },
      { "id": "c", "text": "ウェアハウスが稼働している時間（秒単位、最低1分）" },
      { "id": "d", "text": "月額固定料金" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "仮想ウェアハウスは、稼働している時間に対してクレジットを消費します。課金は秒単位で行われますが、ウェアハウスを起動（または再開）するたびに最低1分間（60秒）の料金が発生します。",
    "urls": ["https://docs.snowflake.com/en/user-guide/warehouses-considerations#warehouse-credit-usage"],
    "category": "Account Management",
    "tags": ["Billing", "Virtual Warehouse"]
  },
  {
    "id": "q30",
    "text": "Python、Java、Scalaなどのコードを使用して、Snowflake内でデータ処理パイプラインやMLモデルを構築・実行できる開発者向けフレームワークは何ですか？",
    "options": [
      { "id": "a", "text": "Snowpipe" },
      { "id": "b", "text": "Snowpark" },
      { "id": "c", "text": "SnowSQL" },
      { "id": "d", "text": "Snowgrid" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Snowparkは、SQL以外の言語（Python, Java, Scala）を使用して、Snowflakeの弾力的な処理エンジンの上で直接データ処理コードを記述・実行できるライブラリおよびランタイムです。",
    "urls": ["https://docs.snowflake.com/en/developer-guide/snowpark/index"],
    "category": "Development",
    "tags": ["Snowpark"]
  },
  {
    "id": "q1",
    "text": "あるデータエンジニアが、Snowflakeの仮想ウェアハウスのサイズを「L（Large）」から「XL（X-Large）」にスケールアップしました。この変更によるクレジット消費量とパフォーマンスへの影響として、最も適切な説明はどれですか？",
    "options": [
      { "id": "a", "text": "クレジット消費量は2倍になり、コンピュートリソース（サーバー数）も2倍になるため、複雑なクエリのパフォーマンス向上が期待できる" },
      { "id": "b", "text": "クレジット消費量は変わらないが、ストレージ容量が2倍になる" },
      { "id": "c", "text": "クレジット消費量は1.5倍になり、同時実行性能（並列処理数）のみが向上する" },
      { "id": "d", "text": "クレジット消費量は4倍になり、クエリの実行速度は必ず4倍になる" }
    ],
    "correctOptionIds": ["a"],
    "explanation": "仮想ウェアハウスのサイズを1段階上げると（例：LからXL）、クレジット消費量とコンピュートリソース（サーバー数/クラスター内のノード数）はそれぞれ2倍になります。これにより、個々の複雑なクエリの処理速度向上が期待できます（スケールアップ）。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/warehouses-considerations"],
    "category": "Performance",
    "tags": ["Virtual Warehouse", "Scaling"]
  },
  {
    "id": "q2",
    "text": "あなたはセキュリティ管理者として、特定のIPアドレス範囲からのアクセスのみを許可するネットワークポリシーを作成しようとしています。Snowflakeが推奨する最新の設定方法はどれですか？",
    "options": [
      { "id": "a", "text": "ネットワークポリシーの `ALLOWED_IP_LIST` パラメータに直接IPアドレスを記述する" },
      { "id": "b", "text": "スキーマレベルのオブジェクトである「ネットワークルール（Network Rule）」を作成し、それをネットワークポリシーに追加する" },
      { "id": "c", "text": "ファイアウォールルールを作成し、VPC設定に適用する" },
      { "id": "d", "text": "ユーザーごとのプロパティ `MINS_TO_BYPASS_NETWORK_POLICY` を設定する" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Snowflakeは現在、ネットワーク識別子（IPアドレスなど）を論理的にグループ化する「ネットワークルール（Network Rule）」の使用を推奨しています。ネットワークポリシー作成時に、`ALLOWED_NETWORK_RULE_LIST` または `BLOCKED_NETWORK_RULE_LIST` にこのルールを追加して制御します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/network-policies#about-network-rules"],
    "category": "Security",
    "tags": ["Network Policies", "Network Rules"]
  },
  {
    "id": "q3",
    "text": "あるクエリのパフォーマンスが悪いため「クエリプロファイル」を確認したところ、「Bytes spilled to remote storage（リモートストレージへのスピル）」が大量に発生していることがわかりました。パフォーマンスを改善するために、まず検討すべき対策はどれですか？",
    "options": [
      { "id": "a", "text": "仮想ウェアハウスをより大きなサイズにスケールアップし、メモリ容量を増やす" },
      { "id": "b", "text": "マルチクラスターウェアハウスを設定し、最大クラスター数を増やす" },
      { "id": "c", "text": "クエリ結果キャッシュを無効にする" },
      { "id": "d", "text": "テーブルのデータを再クラスタリングする" }
    ],
    "correctOptionIds": ["a"],
    "explanation": "「リモートストレージへのスピル」は、ウェアハウスのメモリが不足し、ローカルディスク（SSD）も溢れてS3などのクラウドストレージにデータを書き出している状態です。これはパフォーマンスを著しく低下させます。ウェアハウスのサイズを大きくすることでメモリ容量が増え、スピルを解消または軽減できます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/performance-query-warehouse-memory"],
    "category": "Performance",
    "tags": ["Query Profile", "Spilling"]
  },
  {
    "id": "q4",
    "text": "「Transient（一時的）」テーブルとして定義されたテーブルに対して、Time Travelのデータ保持期間（`DATA_RETENTION_TIME_IN_DAYS`）を最大何日まで設定できますか？",
    "options": [
      { "id": "a", "text": "0日（設定不可）" },
      { "id": "b", "text": "1日" },
      { "id": "c", "text": "7日" },
      { "id": "d", "text": "90日" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Transient（一時的）テーブルおよびTemporary（一時）テーブルは、Fail-safe機能を持たず、Time Travelの保持期間は最大で1日（0または1）に制限されています。Enterprise Edition以上であっても90日には設定できません。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/tables-temp-transient"],
    "category": "Data Protection",
    "tags": ["Time Travel", "Transient Tables"]
  },
  {
    "id": "q5",
    "text": "Snowpipeを使用してS3バケットからデータを自動的に取り込む（Auto-Ingest）構成をセットアップしています。パイプラインが正しく機能するために、クラウドプロバイダー側で設定が必要な機能はどれですか？",
    "options": [
      { "id": "a", "text": "S3バケットのバージョニング機能" },
      { "id": "b", "text": "AWS Lambda関数による定期実行" },
      { "id": "c", "text": "S3イベント通知（SQSキューへの通知）" },
      { "id": "d", "text": "S3 Transfer Acceleration" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "SnowpipeのAuto-Ingest（自動取り込み）は、クラウドストレージからのイベント通知に依存しています。AWS S3の場合、ファイル作成イベントをSQSキューに送信し、Snowpipeがそのキューをポーリングしてロードをトリガーします。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-load-snowpipe-auto-s3"],
    "category": "Data Loading",
    "tags": ["Snowpipe", "Auto-Ingest"]
  },
  {
    "id": "q6",
    "text": "あるユーザーが `COPY INTO` コマンドを実行してデータをロードしようとしていますが、データの一部にエラーが含まれている可能性があります。エラーが発生してもロード処理を中断せず、エラーを含む行だけをスキップして続行したい場合、どのコピーオプションを指定すべきですか？",
    "options": [
      { "id": "a", "text": "ON_ERROR = 'ABORT_STATEMENT'" },
      { "id": "b", "text": "ON_ERROR = 'CONTINUE'" },
      { "id": "c", "text": "ON_ERROR = 'SKIP_FILE'" },
      { "id": "d", "text": "VALIDATION_MODE = 'RETURN_ERRORS'" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "`ON_ERROR = 'CONTINUE'` を指定すると、エラーが見つかってもロードを続行し、エラーのない行をロードします。`SKIP_FILE`はエラーがあるファイルを丸ごとスキップします。`ABORT_STATEMENT`（デフォルト）はエラー発生時にロード全体を中止します。",
    "urls": ["https://docs.snowflake.com/ja/sql-reference/sql/copy-into-table#copy-options-copyOptions"],
    "category": "Data Loading",
    "tags": ["COPY INTO", "Error Handling"]
  },
  {
    "id": "q7",
    "text": "あなたは、部門ごとのコスト管理を行うために「リソースモニター」を作成しました。リソースモニターがクレジット使用量の100%に達した際、実行中のクエリを即座に強制終了し、ウェアハウスを停止させるアクションはどれですか？",
    "options": [
      { "id": "a", "text": "Notify" },
      { "id": "b", "text": "Suspend" },
      { "id": "c", "text": "Suspend Immediately" },
      { "id": "d", "text": "Kill" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "`Suspend Immediately` アクションは、クォータに達した時点で実行中のすべてのクエリをキャンセルし、ウェアハウスを即座に停止します。一方、`Suspend` は実行中のクエリの完了を待ってから停止します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/resource-monitors"],
    "category": "Account Management",
    "tags": ["Resource Monitors", "Cost Control"]
  },
  {
    "id": "q8",
    "text": "Snowflakeにおける「クエリ結果キャッシュ（Query Result Cache）」が再利用される条件として、**誤っている**記述はどれですか？",
    "options": [
      { "id": "a", "text": "新しいクエリが、以前のクエリと構文的に完全に一致している（空白や大文字小文字を含む）" },
      { "id": "b", "text": "クエリの対象となるテーブルのデータに変更がない" },
      { "id": "c", "text": "クエリを実行するユーザーが、以前のクエリを実行したユーザーと同じである必要がある" },
      { "id": "d", "text": "以前のクエリ実行から24時間以内である" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "クエリ結果キャッシュはユーザー固有ではありません。データへのアクセス権限を持つ別のユーザーが同じクエリを実行した場合でも、結果キャッシュを利用できます。他の条件（構文の一致、データ変更なし、24時間以内）は正しい必須条件です。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/querying-persisted-results"],
    "category": "Performance",
    "tags": ["Caching", "Result Cache"]
  },
  {
    "id": "q9",
    "text": "「ディレクトリテーブル（Directory Table）」を使用する主な利点は何ですか？",
    "options": [
      { "id": "a", "text": "構造化データを列形式で高速にクエリできる" },
      { "id": "b", "text": "ステージ上の非構造化データファイル（PDF、画像など）のファイルURLやメタデータをカタログ化してクエリ可能にする" },
      { "id": "c", "text": "外部テーブルのパフォーマンスを自動的に最適化する" },
      { "id": "d", "text": "データのロード履歴を永久に保持する" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "ディレクトリテーブルは、ステージ上のファイルのカタログとして機能し、特に非構造化データのファイルパス、サイズ、最終更新日時などのメタデータを保持し、SQLで検索可能にするために使用されます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-load-dirtables"],
    "category": "Unstructured Data",
    "tags": ["Directory Tables", "Unstructured Data"]
  },
  {
    "id": "q10",
    "text": "Snowflakeの「動的テーブル（Dynamic Table）」の特徴として正しいものはどれですか？",
    "options": [
      { "id": "a", "text": "命令的なDML（INSERT/UPDATE）を使用してデータを管理する" },
      { "id": "b", "text": "宣言的なSQL（SELECT文）で定義され、ターゲットラグ（Target Lag）に基づいて自動的にリフレッシュされる" },
      { "id": "c", "text": "常にリアルタイムで同期され、ラグは発生しない" },
      { "id": "d", "text": "外部ステージのデータに対してのみ作成できる" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "動的テーブルは、`CREATE DYNAMIC TABLE ... AS SELECT` という宣言的なSQLで定義されます。Snowflakeは指定されたターゲットラグ（Target Lag）以内にデータが最新になるよう、バックグラウンドで自動的にリフレッシュをスケジュールします。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/dynamic-tables-intro"],
    "category": "Data Engineering",
    "tags": ["Dynamic Tables", "Data Engineering"]
  },
  {
    "id": "q11",
    "text": "あるテーブルに対して「クラスタリングキー」を定義することを検討しています。クラスタリングが最も効果を発揮するシナリオはどれですか？",
    "options": [
      { "id": "a", "text": "テーブルサイズが小さく（数GB以下）、頻繁にフルスキャンされる場合" },
      { "id": "b", "text": "テーブルが非常に大きく（数TB以上）、特定の列（日付など）による範囲フィルタリングや並べ替えが頻繁に行われる場合" },
      { "id": "c", "text": "クエリが常に `SELECT *` を実行する場合" },
      { "id": "d", "text": "JSONデータを頻繁にロードする場合" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "クラスタリングは、数TBを超えるような非常に大きなテーブルにおいて、特定の列（クラスタリングキー）に基づいてデータを物理的に並べ替えることで、クエリ時のマイクロパーティションのプルーニング効率を高める機能です。小さなテーブルではコスト対効果が低くなります。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/tables-clustering-keys"],
    "category": "Performance",
    "tags": ["Clustering", "Micro-partitions"]
  },
  {
    "id": "q12",
    "text": "データ共有（Data Sharing）において、「リーダーアカウント（Reader Account）」が必要となるのはどのようなケースですか？",
    "options": [
      { "id": "a", "text": "データの提供者（Provider）と消費者（Consumer）が異なるクラウドリージョンにいる場合" },
      { "id": "b", "text": "データの消費者（Consumer）がSnowflakeアカウントを持っていない場合" },
      { "id": "c", "text": "データを共有する際に、行レベルのセキュリティを適用したい場合" },
      { "id": "d", "text": "マーケットプレイスでデータを公開する場合" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "リーダーアカウントは、Snowflakeアカウントを持っていないサードパーティに対してデータを共有するためにプロバイダーが作成・管理するアカウントです。コンピュート料金はプロバイダーが負担します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-sharing-reader-create"],
    "category": "Data Sharing",
    "tags": ["Reader Accounts", "Data Sharing"]
  },
  {
    "id": "q13",
    "text": "フェデレーション認証（SSO）を構成する際、ユーザーがSnowflakeにアクセスしたときに最初にIdP（Identity Provider）にリダイレクトされ、認証後にSnowflakeに戻るフローを何と呼びますか？",
    "options": [
      { "id": "a", "text": "IdP-initiated login" },
      { "id": "b", "text": "Snowflake-initiated login (SP-initiated)" },
      { "id": "c", "text": "MFA login" },
      { "id": "d", "text": "OAuth flow" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "ユーザーがSnowflakeのURL（Service Provider）に直接アクセスし、そこから認証のためにIdPにリダイレクトされるフローは「Snowflake-initiated login（またはSP-initiated login）」と呼ばれます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/admin-security-fed-auth-overview"],
    "category": "Security",
    "tags": ["SSO", "Federated Authentication"]
  },
  {
    "id": "q14",
    "text": "Snowflakeの「検索最適化サービス（Search Optimization Service）」を有効にする際に必要な権限とコストに関する説明として正しいものはどれですか？",
    "options": [
      { "id": "a", "text": "Standard Editionで利用可能で、追加コストはかからない" },
      { "id": "b", "text": "Enterprise Edition以上が必要で、構築とメンテナンスのためのサーバーレスコンピュートコストおよびストレージコストが発生する" },
      { "id": "c", "text": "テーブルの所有者（OWNERSHIP）であれば、どのエディションでも利用できる" },
      { "id": "d", "text": "検索インデックスは仮想ウェアハウスのキャッシュにのみ保存されるため、ストレージコストはかからない" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "検索最適化サービスはEnterprise Edition以上の機能です。インデックス（検索アクセスパス）の構築と維持にはバックグラウンドのサーバーレスコンピュートクレジットが消費され、作成されたインデックスにはストレージコストも発生します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/search-optimization-service"],
    "category": "Performance",
    "tags": ["Search Optimization", "Editions"]
  },
  {
    "id": "q15",
    "text": "以下のアカウントレベルのパラメータのうち、Snowflakeサポートに連絡しないと変更できない（ユーザーが直接変更できない）ものはどれですか？",
    "options": [
      { "id": "a", "text": "DATA_RETENTION_TIME_IN_DAYS" },
      { "id": "b", "text": "NETWORK_POLICY" },
      { "id": "c", "text": "ENABLE_INTERNAL_STAGES_PRIVATELINK" },
      { "id": "d", "text": "MAX_CONCURRENCY_LEVEL" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "多くのパラメータはALTER ACCOUNTで変更可能ですが、PrivateLinkに関連する特定の設定や、一部のプレビュー機能の有効化など、インフラストラクチャに深く関わる設定（例：`ENABLE_INTERNAL_STAGES_PRIVATELINK`など）はSnowflakeサポートへの依頼が必要な場合があります。",
    "urls": ["https://docs.snowflake.com/ja/sql-reference/parameters"],
    "category": "Account Management",
    "tags": ["Parameters", "Support"]
  },
  {
    "id": "q16",
    "text": "テーブルのデータを誤って削除してしまいました。Time Travelの保持期間も過ぎてしまっています。この場合、データ復旧の最後の手段として利用できる機能は何ですか？",
    "options": [
      { "id": "a", "text": "Undrop Tableコマンド" },
      { "id": "b", "text": "Fail-safe（フェイルセーフ）" },
      { "id": "c", "text": "Zero-Copy Clone" },
      { "id": "d", "text": "Metadata Cache" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Time Travel期間（最大90日）が終了すると、データはFail-safe期間（7日間）に移行します。Fail-safeはユーザーが操作できず、Snowflakeサポートに依頼してデータを復旧するための最後の手段です。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-failsafe"],
    "category": "Data Protection",
    "tags": ["Fail-safe", "Disaster Recovery"]
  },
  {
    "id": "q17",
    "text": "Snowflakeで「セカンダリロール（Secondary Roles）」を `USE SECONDARY ROLES ALL` で有効にした場合、どのような効果がありますか？",
    "options": [
      { "id": "a", "text": "ユーザーはプライマリロールの権限を失い、セカンダリロールの権限のみを使用する" },
      { "id": "b", "text": "ユーザーはプライマリロールの権限に加え、付与されている他のすべてのロールの権限（CREATE権限を除く）を同時に使用できる" },
      { "id": "c", "text": "すべてのロールのCREATE権限（オブジェクト作成権限）が有効になる" },
      { "id": "d", "text": "ACCOUNTADMINロールの権限が一時的に付与される" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "セカンダリロールを有効にすると、ユーザーに付与されているすべてのロールの権限（主にSELECTなどの参照権限）を統合して使用できます。ただし、`CREATE` などのオブジェクト作成権限は、現在アクティブな「プライマリロール」のものだけが有効です。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/security-access-control-configure#using-secondary-roles"],
    "category": "Security",
    "tags": ["RBAC", "Secondary Roles"]
  },
  {
    "id": "q18",
    "text": "「マテリアライズドビュー（Materialized View）」の自動リフレッシュ（メンテナンス）にかかるコストは、どのように請求されますか？",
    "options": [
      { "id": "a", "text": "ユーザーが指定した仮想ウェアハウスのクレジットとして請求される" },
      { "id": "b", "text": "クラウドサービスレイヤーの調整コストに含まれ、無料である" },
      { "id": "c", "text": "Snowflakeが管理するサーバーレスコンピュートリソースを使用し、個別にクレジットが請求される" },
      { "id": "d", "text": "ストレージ料金に上乗せされる" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "マテリアライズドビューのメンテナンス（ベーステーブル変更時のリフレッシュ）は、ユーザーの仮想ウェアハウスではなく、Snowflakeが提供するサーバーレスコンピュートリソースによってバックグラウンドで実行され、そのクレジット使用量が請求されます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/views-materialized#materialized-view-maintenance-costs"],
    "category": "Performance",
    "tags": ["Materialized Views", "Cost"]
  },
  {
    "id": "q19",
    "text": "Snowflakeの請求において、仮想ウェアハウスが「自動再開（Auto-resume）」されてから10秒後に「自動停止（Auto-suspend）」設定により停止した場合、課金される時間はどれくらいですか？",
    "options": [
      { "id": "a", "text": "10秒分" },
      { "id": "b", "text": "30秒分" },
      { "id": "c", "text": "1分分（60秒分）" },
      { "id": "d", "text": "1時間分" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "仮想ウェアハウスは1秒単位で課金されますが、起動（または再開）するたびに最低1分間（60秒）の課金が発生します。したがって、10秒で停止しても1分分のクレジットが消費されます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/warehouses-considerations#warehouse-credit-usage"],
    "category": "Account Management",
    "tags": ["Billing", "Virtual Warehouse"]
  },
  {
    "id": "q1",
    "text": "Snowflakeのアーキテクチャにおいて、認証、インフラストラクチャ管理、メタデータ管理、およびクエリの最適化を一元的に処理するレイヤーはどれですか？",
    "options": [
      { "id": "a", "text": "クラウドサービスレイヤー" },
      { "id": "b", "text": "クエリ処理（コンピュート）レイヤー" },
      { "id": "c", "text": "データベースストレージレイヤー" },
      { "id": "d", "text": "仮想ウェアハウスレイヤー" }
    ],
    "correctOptionIds": ["a"],
    "explanation": "クラウドサービスレイヤーはSnowflakeの「脳」として機能し、認証、インフラ管理、メタデータ管理、クエリの解析と最適化、アクセス制御などの調整サービスを一元的に処理します。このレイヤーはステートレスなコンピュートリソースで構成されています。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/intro-key-concepts"],
    "category": "Architecture",
    "tags": ["Cloud Services", "Metadata"]
  },
  {
    "id": "q2",
    "text": "Snowflakeのマイクロパーティションの特徴として、正しい説明はどれですか？",
    "options": [
      { "id": "a", "text": "ユーザーが手動でパーティションサイズを定義する必要がある" },
      { "id": "b", "text": "不変（Immutable）であり、データ変更時は新しいマイクロパーティションが作成される" },
      { "id": "c", "text": "データは非圧縮の行指向形式で保存される" },
      { "id": "d", "text": "論理的な構造であり、物理ストレージにはマッピングされない" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "マイクロパーティションは50MB〜500MB（非圧縮時）の連続したストレージ単位で、不変（Immutable）です。DML操作でデータが変更されると、既存のパーティションは変更されず、新しいマイクロパーティションが作成されます。これによりTime Travelやクローニングが可能になります。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/tables-clustering-micropartitions"],
    "category": "Architecture",
    "tags": ["Storage", "Micro-partitions"]
  },
  {
    "id": "q3",
    "text": "仮想ウェアハウスのサイズを「L（Large）」から「XL（X-Large）」に変更（スケールアップ）した際の効果として最も適切なものはどれですか？",
    "options": [
      { "id": "a", "text": "同時実行可能なクエリ数が倍増し、キューイングが解消される" },
      { "id": "b", "text": "個々の複雑なクエリの実行速度が向上し、ローカルディスクへのスピルが軽減される可能性がある" },
      { "id": "c", "text": "ストレージ容量が倍増する" },
      { "id": "d", "text": "クラウドサービスレイヤーのコストが半減する" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "ウェアハウスのサイズアップ（スケールアップ）は、個々のクエリに対する計算能力とメモリ容量を増加させます。これにより、複雑なクエリの高速化や、メモリ不足によるディスクスピルの解消が期待できます。同時実行性の向上にはスケールアウト（マルチクラスター）が適しています。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/warehouses-considerations"],
    "category": "Performance",
    "tags": ["Virtual Warehouse", "Scaling"]
  },
  {
    "id": "q4",
    "text": "「マルチクラスターウェアハウス」機能を利用するために必要なSnowflakeの最小エディションはどれですか？",
    "options": [
      { "id": "a", "text": "Standard" },
      { "id": "b", "text": "Enterprise" },
      { "id": "c", "text": "Business Critical" },
      { "id": "d", "text": "Virtual Private Snowflake (VPS)" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "マルチクラスターウェアハウスは、同時実行性が高いワークロードに対して自動的にクラスター数を増減させる機能であり、Enterprise Edition以上で利用可能です。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/intro-editions"],
    "category": "Account Management",
    "tags": ["Editions", "Multi-cluster Warehouse"]
  },
  {
    "id": "q5",
    "text": "Snowflakeにおける「ステージ」の種類のうち、各ユーザーにデフォルトで割り当てられ、他のユーザーからはアクセスできないステージはどれですか？",
    "options": [
      { "id": "a", "text": "名前付き内部ステージ (Named Internal Stage)" },
      { "id": "b", "text": "テーブルステージ (Table Stage)" },
      { "id": "c", "text": "ユーザーステージ (User Stage)" },
      { "id": "d", "text": "外部ステージ (External Stage)" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "ユーザーステージは各ユーザーに自動的に割り当てられ、`@~`で参照されます。このステージは、そのユーザーのみがアクセス可能で、ファイルの一時的な保存やロードに使用されます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-load-local-file-system-create-stage"],
    "category": "Data Loading",
    "tags": ["Stages", "Data Loading"]
  },
  {
    "id": "q6",
    "text": "Snowpipeを使用してS3バケットからデータを自動的にロードする際、ロードのトリガーとして使用されるメカニズムはどれですか？",
    "options": [
      { "id": "a", "text": "定期的なポーリング" },
      { "id": "b", "text": "イベント通知（SQS/SNS等）" },
      { "id": "c", "text": "手動実行コマンド" },
      { "id": "d", "text": "データベーストリガー" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Snowpipeの自動取り込み（Auto-Ingest）は、クラウドストレージ（S3, Azure Blob, GCS）からのイベント通知（ファイル作成イベント）を利用して、新しいファイルがステージに配置されたことを検知し、ロードを実行します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-load-snowpipe-auto-s3"],
    "category": "Data Loading",
    "tags": ["Snowpipe", "Auto-Ingest"]
  },
  {
    "id": "q7",
    "text": "クエリ結果キャッシュ（Query Result Cache）が再利用されるための条件として、誤っているものはどれですか？",
    "options": [
      { "id": "a", "text": "新しいクエリが、以前のクエリと構文的に完全に一致している" },
      { "id": "b", "text": "クエリの対象となるテーブルのデータに変更がない" },
      { "id": "c", "text": "クエリを実行するユーザーが、以前のクエリを実行したユーザーと同一である必要がある" },
      { "id": "d", "text": "以前のクエリ実行から24時間以内である" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "クエリ結果キャッシュはユーザー固有ではありません。アクセス権限を持つ別のユーザーが同じクエリを実行した場合でも、結果キャッシュを利用できます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/querying-persisted-results"],
    "category": "Performance",
    "tags": ["Caching", "Result Cache"]
  },
  {
    "id": "q8",
    "text": "クエリのパフォーマンスを向上させるために、WHERE句のフィルタ条件に基づいて不要なマイクロパーティションのスキャンをスキップするプロセスは何ですか？",
    "options": [
      { "id": "a", "text": "クラスタリング" },
      { "id": "b", "text": "プルーニング（Pruning）" },
      { "id": "c", "text": "インデックススキャン" },
      { "id": "d", "text": "マテリアライズ" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "プルーニングは、クエリ実行時にメタデータ（各マイクロパーティションの最小値・最大値など）を参照し、クエリに関連のないマイクロパーティションを読み込み対象から除外することで、スキャン効率を劇的に向上させる機能です。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/tables-clustering-micropartitions"],
    "category": "Performance",
    "tags": ["Pruning", "Micro-partitions"]
  },
  {
    "id": "q9",
    "text": "Standard EditionにおけるTime Travelのデータ保持期間の最大値は何日ですか？",
    "options": [
      { "id": "a", "text": "0日" },
      { "id": "b", "text": "1日" },
      { "id": "c", "text": "7日" },
      { "id": "d", "text": "90日" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Standard EditionにおけるTime Travelのデータ保持期間（DATA_RETENTION_TIME_IN_DAYS）は最大1日です。Enterprise Edition以上では最大90日まで設定可能です。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-time-travel"],
    "category": "Data Protection",
    "tags": ["Time Travel", "Editions"]
  },
  {
    "id": "q10",
    "text": "Fail-safe（フェイルセーフ）期間に関する説明として正しいものはどれですか？",
    "options": [
      { "id": "a", "text": "ユーザーがSQLコマンドでデータを復元できる期間である" },
      { "id": "b", "text": "Time Travel期間終了直後に開始される7日間の期間で、Snowflakeサポートのみがデータ復旧を行える" },
      { "id": "c", "text": "Transientテーブルでも利用可能である" },
      { "id": "d", "text": "最大90日まで設定可能である" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Fail-safeはTime Travel終了後の7日間、データの履歴を保護する期間です。ユーザー操作による復元はできず、極端なデータ損失時にSnowflakeサポートが介入して復旧するための最後の手段です。TransientテーブルにはFail-safeはありません。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-failsafe"],
    "category": "Data Protection",
    "tags": ["Fail-safe"]
  },
  {
    "id": "q11",
    "text": "ゼロコピークローン（Zero-Copy Cloning）を作成した直後のストレージコストについて正しい説明はどれですか？",
    "options": [
      { "id": "a", "text": "元のテーブルと同じサイズのストレージコストが即座に発生する" },
      { "id": "b", "text": "メタデータのみがコピーされるため、追加のストレージコストは発生しない" },
      { "id": "c", "text": "元のテーブルの50%のストレージコストが発生する" },
      { "id": "d", "text": "クラウドサービスレイヤーのコストとして請求される" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "ゼロコピークローンは、データの物理コピーを行わず、元のマイクロパーティションを参照するメタデータを作成するだけです。したがって、作成時点では追加のストレージ容量を消費しません。変更が加えられたデータのみが別途保存されます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/object-clone"],
    "category": "Data Protection",
    "tags": ["Cloning"]
  },
  {
    "id": "q12",
    "text": "Snowflakeアカウントを持っていない外部の顧客にデータを共有する場合、プロバイダーが作成すべきアカウントタイプはどれですか？",
    "options": [
      { "id": "a", "text": "コンシューマーアカウント" },
      { "id": "b", "text": "リーダーアカウント（Reader Account）" },
      { "id": "c", "text": "プロキシユーザー" },
      { "id": "d", "text": "ゲストアカウント" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "リーダーアカウントは、Snowflakeアカウントを持たないサードパーティ向けにデータ共有を行うためにプロバイダーが作成・管理するアカウントです。このアカウントのコンピュート使用料はプロバイダーが負担します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-sharing-reader-create"],
    "category": "Data Sharing",
    "tags": ["Reader Accounts", "Data Sharing"]
  },
  {
    "id": "q13",
    "text": "ユーザーやロールの作成・管理に加え、`MANAGE GRANTS` 権限を持ち、権限付与をグローバルに管理できるシステムロールはどれですか？",
    "options": [
      { "id": "a", "text": "SYSADMIN" },
      { "id": "b", "text": "USERADMIN" },
      { "id": "c", "text": "SECURITYADMIN" },
      { "id": "d", "text": "PUBLIC" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "SECURITYADMINロールは、ユーザーやロールの作成管理に加え、`MANAGE GRANTS`権限を持っており、アカウント内のあらゆるアクセス制御の付与（GRANT）を管理・変更できます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/security-access-control-overview"],
    "category": "Security",
    "tags": ["RBAC", "Roles"]
  },
  {
    "id": "q14",
    "text": "ネットワークポリシーにおいて、アクセスを許可またはブロックするために使用できる識別子は何ですか？",
    "options": [
      { "id": "a", "text": "MACアドレス" },
      { "id": "b", "text": "IPアドレス（IPv4）" },
      { "id": "c", "text": "ユーザー名" },
      { "id": "d", "text": "OSの種類" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Snowflakeのネットワークポリシーは、許可リストとブロックリストを使用して、特定のIPv4アドレスまたはCIDRブロックからのアクセスを制限します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/network-policies"],
    "category": "Security",
    "tags": ["Network Policies"]
  },
  {
    "id": "q15",
    "text": "多要素認証（MFA）を有効にするために、ユーザーがスマートフォンにインストールすることが推奨されるアプリケーションはどれですか？",
    "options": [
      { "id": "a", "text": "Google Authenticator" },
      { "id": "b", "text": "Duo Mobile" },
      { "id": "c", "text": "Microsoft Authenticator" },
      { "id": "d", "text": "Okta Verify" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "SnowflakeのMFA機能はDuo Securityによって提供されており、ユーザーはDuo Mobileアプリを使用して認証を行うことが推奨・統合されています。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/security-mfa"],
    "category": "Security",
    "tags": ["MFA"]
  },
  {
    "id": "q16",
    "text": "JSON、Avro、Parquetなどの半構造化データをSnowflakeテーブルにロードする際に使用されるデータ型はどれですか？",
    "options": [
      { "id": "a", "text": "VARCHAR" },
      { "id": "b", "text": "BLOB" },
      { "id": "c", "text": "VARIANT" },
      { "id": "d", "text": "XML" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "VARIANTデータ型は、JSON、Avro、ORC、Parquetなどの半構造化データをそのままの階層構造で格納するために設計されたSnowflake固有のデータ型です。最大16MBまで格納可能です。",
    "urls": ["https://docs.snowflake.com/ja/sql-reference/data-types-semistructured"],
    "category": "Data Types",
    "tags": ["Semi-structured Data", "VARIANT"]
  },
  {
    "id": "q17",
    "text": "リソースモニターを使用して制御できる対象は次のうちどれですか？",
    "options": [
      { "id": "a", "text": "ストレージ使用量" },
      { "id": "b", "text": "ユーザーのログイン回数" },
      { "id": "c", "text": "仮想ウェアハウスのクレジット消費量" },
      { "id": "d", "text": "クラウドサービスレイヤーのコスト" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "リソースモニターは、仮想ウェアハウスによるクレジット消費（コンピュートコスト）を監視し、設定されたクォータ（上限）に達した場合にアラート送信やウェアハウスの停止を行います。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/resource-monitors"],
    "category": "Account Management",
    "tags": ["Resource Monitors", "Cost Management"]
  },
  {
    "id": "q18",
    "text": "仮想ウェアハウスのサイズ変更（リサイズ）に関する記述として正しいものはどれですか？",
    "options": [
      { "id": "a", "text": "ウェアハウスを一度停止（Suspend）する必要がある" },
      { "id": "b", "text": "実行中のクエリも含めて即座に新しいリソースが適用される" },
      { "id": "c", "text": "ウェアハウスを停止することなく実行中にサイズ変更が可能で、新しいサイズは後続のクエリに適用される" },
      { "id": "d", "text": "サイズ変更には管理者（ACCOUNTADMIN）の承認が必要である" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "仮想ウェアハウスのサイズ変更は、ウェアハウスが稼働中でも実行可能です。変更は新しく投入されるクエリに対して有効になり、現在実行中のクエリは変更前のリソースで完了します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/warehouses-considerations"],
    "category": "Performance",
    "tags": ["Virtual Warehouse", "Scaling"]
  },
  {
    "id": "q19",
    "text": "データロード時の変換処理（Transform during load）として、`COPY INTO` コマンドで実行**できない**操作はどれですか？",
    "options": [
      { "id": "a", "text": "列の並べ替え" },
      { "id": "b", "text": "データ型のキャスト" },
      { "id": "c", "text": "列の省略" },
      { "id": "d", "text": "JOIN句を使用した他のテーブルとの結合" }
    ],
    "correctOptionIds": ["d"],
    "explanation": "`COPY INTO` コマンドでのデータロード中には、列の並べ替え、省略、キャスト、文字列の切り捨てなどの単純な変換はサポートされていますが、JOIN句を使用した結合や、集計（GROUP BY）はサポートされていません。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-load-transform"],
    "category": "Data Loading",
    "tags": ["COPY INTO", "Transformation"]
  },
  {
    "id": "q20",
    "text": "クエリのパフォーマンスを分析するために、過去1年間のクエリ履歴を確認したい場合、どのスキーマを使用すべきですか？",
    "options": [
      { "id": "a", "text": "INFORMATION_SCHEMA" },
      { "id": "b", "text": "SNOWFLAKE.ACCOUNT_USAGE" },
      { "id": "c", "text": "PUBLIC" },
      { "id": "d", "text": "SYSADMIN" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "`SNOWFLAKE.ACCOUNT_USAGE` スキーマは最大365日（1年間）の履歴データを保持します。一方、`INFORMATION_SCHEMA` は通常、過去7日〜14日分（ビューによる）のデータしか保持しません。",
    "urls": ["https://docs.snowflake.com/ja/sql-reference/account-usage/query_history"],
    "category": "Account Management",
    "tags": ["Account Usage", "Monitoring"]
  },
  {
    "id": "q21",
    "text": "「検索最適化サービス（Search Optimization Service）」が最も効果を発揮するクエリパターンはどれですか？",
    "options": [
      { "id": "a", "text": "大量のデータを集計するクエリ" },
      { "id": "b", "text": "テーブル全体のスキャンが必要なクエリ" },
      { "id": "c", "text": "特定の値を検索するポイントルックアップクエリ（Needle in a haystack）" },
      { "id": "d", "text": "複雑な結合を含むクエリ" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "検索最適化サービスは、大量のデータの中から特定の値をフィルタリングして返す「ポイントルックアップクエリ（干し草の山から針を探すようなクエリ）」のパフォーマンスを大幅に向上させるために設計されています。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/search-optimization-service"],
    "category": "Performance",
    "tags": ["Search Optimization"]
  },
  {
    "id": "q22",
    "text": "マテリアライズドビュー（Materialized View）の主な利点は何ですか？",
    "options": [
      { "id": "a", "text": "リアルタイムデータの書き込み速度を向上させる" },
      { "id": "b", "text": "頻繁に実行される集計クエリの結果を事前計算して保存し、クエリ応答時間を短縮する" },
      { "id": "c", "text": "ストレージコストをゼロにする" },
      { "id": "d", "text": "任意のSQL（結合や複雑なサブクエリを含む）をサポートする" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "マテリアライズドビューは、クエリ結果を事前に計算して保存しておくことで、同じ集計やフィルタリングを行うクエリのパフォーマンスを向上させます。バックグラウンドで自動的にメンテナンスされます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/views-materialized"],
    "category": "Performance",
    "tags": ["Materialized Views"]
  },
  {
    "id": "q23",
    "text": "Snowflakeパートナー（BIツールやETLツールなど）とのトライアルアカウント連携を数クリックですばやく開始できる機能はどれですか？",
    "options": [
      { "id": "a", "text": "Data Exchange" },
      { "id": "b", "text": "Partner Connect" },
      { "id": "c", "text": "Snowgrid" },
      { "id": "d", "text": "Marketplace" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Partner Connectを使用すると、Snowflakeアカウント内から直接、選択したパートナー（Informatica, Fivetran, Tableauなど）のトライアルアカウントを作成し、自動的に接続設定を行うことができます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/ecosystem-partner-connect"],
    "category": "Ecosystem",
    "tags": ["Partner Connect"]
  },
  {
    "id": "q24",
    "text": "外部テーブル（External Table）の主な用途として適切なものはどれですか？",
    "options": [
      { "id": "a", "text": "Snowflake内部ストレージにデータをロードして高速分析する" },
      { "id": "b", "text": "データをSnowflakeにロードせずに、クラウドストレージ上のファイル（データレイク）に直接クエリを実行する" },
      { "id": "c", "text": "OLTPワークロードを処理する" },
      { "id": "d", "text": "一時的なデータを保存する" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "外部テーブルは、S3やAzure Blobなどの外部クラウドストレージにあるファイルに対して、データをSnowflake内に取り込むことなく直接クエリを実行できる機能です（スキーマオンリード）。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/tables-external-intro"],
    "category": "Data Loading",
    "tags": ["External Tables"]
  },
  {
    "id": "q25",
    "text": "Snowflakeにおける「ダイナミックテーブル（Dynamic Table）」の主な目的は何ですか？",
    "options": [
      { "id": "a", "text": "データの長期アーカイブ" },
      { "id": "b", "text": "宣言的なSQLを使用して、信頼性の高いデータ変換パイプラインを構築する" },
      { "id": "c", "text": "外部パートナーとのデータ共有" },
      { "id": "d", "text": "非構造化データの保存" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "ダイナミックテーブルは、`CREATE DYNAMIC TABLE ... AS SELECT`という宣言的なSQLを使用して、ターゲットとなるテーブルの状態を定義します。Snowflakeは自動的にリフレッシュを管理し、データパイプラインの構築を簡素化します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/dynamic-tables-intro"],
    "category": "Data Engineering",
    "tags": ["Dynamic Tables"]
  },
  {
    "id": "q26",
    "text": "クラウドストレージ上の非構造化データ（画像やPDFなど）のファイルURLやメタデータをカタログ化し、クエリ可能にする機能はどれですか？",
    "options": [
      { "id": "a", "text": "ディレクトリテーブル（Directory Table）" },
      { "id": "b", "text": "テンポラリテーブル" },
      { "id": "c", "text": "ストリーム" },
      { "id": "d", "text": "ファイルフォーマット" }
    ],
    "correctOptionIds": ["a"],
    "explanation": "ディレクトリテーブルは、ステージ上のファイル（非構造化データを含む）のカタログとして機能し、ファイル名、サイズ、更新日時、URLなどのメタデータをクエリ可能な形式で提供します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-load-dirtables"],
    "category": "Unstructured Data",
    "tags": ["Directory Tables"]
  },
  {
    "id": "q27",
    "text": "列レベルのセキュリティ機能で、権限のないユーザーに対してデータを隠蔽（例：メールアドレスの一部をアスタリスクにする）する機能は何ですか？",
    "options": [
      { "id": "a", "text": "行アクセスポリシー" },
      { "id": "b", "text": "ダイナミックデータマスキング" },
      { "id": "c", "text": "ネットワークポリシー" },
      { "id": "d", "text": "リソースモニター" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "ダイナミックデータマスキングは、クエリ実行時にユーザーのロールや権限に基づいて、列の値を動的にマスク（隠蔽または難読化）する機能です。元のデータは変更されません。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/security-column-ddm-intro"],
    "category": "Security",
    "tags": ["Data Masking", "Governance"]
  },
  {
    "id": "q28",
    "text": "ロード前にデータファイルの内容（エラー有無など）を確認したい場合、`COPY INTO` コマンドで使用すべきオプションはどれですか？",
    "options": [
      { "id": "a", "text": "ON_ERROR = CONTINUE" },
      { "id": "b", "text": "FORCE = TRUE" },
      { "id": "c", "text": "VALIDATION_MODE = RETURN_ERRORS" },
      { "id": "d", "text": "PURGE = TRUE" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "`VALIDATION_MODE` オプションを使用すると、データを実際にロードすることなく、ファイルをスキャンしてエラーを確認できます。`RETURN_ERRORS` を指定すると、ファイル内のすべてのエラーが返されます。",
    "urls": ["https://docs.snowflake.com/ja/sql-reference/sql/copy-into-table"],
    "category": "Data Loading",
    "tags": ["COPY INTO", "Validation"]
  },
  {
    "id": "q29",
    "text": "Snowflakeの請求において、仮想ウェアハウスの課金単位として正しいものはどれですか？",
    "options": [
      { "id": "a", "text": "クエリ数単位" },
      { "id": "b", "text": "スキャンされたデータ量（バイト）単位" },
      { "id": "c", "text": "ウェアハウスが稼働している時間（秒単位、最低1分）" },
      { "id": "d", "text": "月額固定料金" }
    ],
    "correctOptionIds": ["c"],
    "explanation": "仮想ウェアハウスは、稼働している時間に対してクレジットを消費します。課金は秒単位で行われますが、ウェアハウスを起動（または再開）するたびに最低1分間の料金が発生します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/warehouses-considerations#warehouse-credit-usage"],
    "category": "Account Management",
    "tags": ["Billing", "Virtual Warehouse"]
  },
  {
    "id": "q30",
    "text": "Python、Java、Scalaなどのコードを使用して、Snowflake内でデータ処理パイプラインやMLモデルを構築・実行できる開発者向けフレームワークは何ですか？",
    "options": [
      { "id": "a", "text": "Snowpipe" },
      { "id": "b", "text": "Snowpark" },
      { "id": "c", "text": "SnowSQL" },
      { "id": "d", "text": "Snowgrid" }
    ],
    "correctOptionIds": ["b"],
    "explanation": "Snowparkは、SQL以外の言語（Python, Java, Scala）を使用して、Snowflakeの弾力的な処理エンジンの上で直接データ処理コードを記述・実行できるライブラリおよびランタイムです。",
    "urls": ["https://docs.snowflake.com/ja/developer-guide/snowpark/index"],
    "category": "Development",
    "tags": ["Snowpark"]
  },
  {
    "id": "q1",
    "text": "Snowflakeの継続的なデータ保護（CDP）機能の一部であり、過去のデータ状態を保護・復元するために提供されている機能を2つ選択してください。",
    "options": [
      { "id": "a", "text": "Time Travel" },
      { "id": "b", "text": "Fail-safe" },
      { "id": "c", "text": "Snowpipe" },
      { "id": "d", "text": "Resource Monitor" },
      { "id": "e", "text": "Result Cache" }
    ],
    "correctOptionIds": ["a", "b"],
    "explanation": "SnowflakeのCDP機能には、データの誤削除や変更から保護する「Time Travel（タイムトラベル）」と、システム障害等の際のデータ復旧用にSnowflakeが管理する「Fail-safe（フェイルセーフ）」が含まれます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-availability"],
    "category": "Data Protection",
    "tags": ["Time Travel", "Fail-safe"]
  },
  {
    "id": "q2",
    "text": "新しいユーザーやロールを作成する権限を持つシステム定義ロールを2つ選択してください。",
    "options": [
      { "id": "a", "text": "SYSADMIN" },
      { "id": "b", "text": "SECURITYADMIN" },
      { "id": "c", "text": "USERADMIN" },
      { "id": "d", "text": "PUBLIC" },
      { "id": "e", "text": "ORGADMIN" }
    ],
    "correctOptionIds": ["b", "c"],
    "explanation": "「USERADMIN」はユーザーとロールの作成・管理に特化したロールです。「SECURITYADMIN」はUSERADMINの権限を継承しており、さらにグローバルな権限管理（MANAGE GRANTS）も可能です。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/security-access-control-overview#system-defined-roles"],
    "category": "Security",
    "tags": ["RBAC", "Roles"]
  },
  {
    "id": "q3",
    "text": "仮想ウェアハウスのクレジット消費量（課金額）に直接影響を与える要因を2つ選択してください。",
    "options": [
      { "id": "a", "text": "ウェアハウスのサイズ（X-Small, Largeなど）" },
      { "id": "b", "text": "ウェアハウスに保存されているデータの量" },
      { "id": "c", "text": "ウェアハウスが稼働している時間" },
      { "id": "d", "text": "実行されたクエリの複雑さ" },
      { "id": "e", "text": "結果キャッシュの使用量" }
    ],
    "correctOptionIds": ["a", "c"],
    "explanation": "仮想ウェアハウスのコストは、「ウェアハウスのサイズ（クラスターあたりのクレジット数）」と「稼働時間（秒単位、最低1分）」によって決まります。保存データ量はストレージコストであり、コンピュートコストには直接影響しません。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/warehouses-considerations#warehouse-credit-usage"],
    "category": "Account Management",
    "tags": ["Cost Management", "Virtual Warehouse"]
  },
  {
    "id": "q4",
    "text": "SnowflakeのEnterprise Edition以上でのみ利用可能な機能を2つ選択してください。",
    "options": [
      { "id": "a", "text": "標準SQLのサポート" },
      { "id": "b", "text": "マルチクラスターウェアハウス" },
      { "id": "c", "text": "最大90日間のTime Travel" },
      { "id": "d", "text": "データの暗号化（Always-on Encryption）" },
      { "id": "e", "text": "外部テーブル" }
    ],
    "correctOptionIds": ["b", "c"],
    "explanation": "「マルチクラスターウェアハウス」と「最大90日間のTime Travel（Standardは1日のみ）」はEnterprise Edition以上の機能です。標準SQLやデータ暗号化は全エディションで利用可能です。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/intro-editions"],
    "category": "Account Management",
    "tags": ["Editions", "Features"]
  },
  {
    "id": "q5",
    "text": "クエリパフォーマンスを向上させるためにSnowflakeが自動的に使用するキャッシングレイヤーを2つ選択してください。",
    "options": [
      { "id": "a", "text": "クエリ結果キャッシュ（Result Cache）" },
      { "id": "b", "text": "S3バケットキャッシュ" },
      { "id": "c", "text": "ローカルディスクキャッシュ（ウェアハウスキャッシュ）" },
      { "id": "d", "text": "ネットワークキャッシュ" },
      { "id": "e", "text": "インデックスキャッシュ" }
    ],
    "correctOptionIds": ["a", "c"],
    "explanation": "Snowflakeは主に「クエリ結果キャッシュ（クラウドサービス層）」と「ローカルディスクキャッシュ（仮想ウェアハウスのSSD）」を使用してパフォーマンスを最適化します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/querying-persisted-results"],
    "category": "Performance",
    "tags": ["Caching", "Performance"]
  },
  {
    "id": "q6",
    "text": "`COPY INTO <table>` コマンドを使用してデータをロードする際、ソースとして指定できるステージの種類を2つ選択してください。",
    "options": [
      { "id": "a", "text": "内部ステージ（名前付きステージ、ユーザーステージ等）" },
      { "id": "b", "text": "外部ステージ（S3, Azure Blob, GCS）" },
      { "id": "c", "text": "別のデータベースのテーブル" },
      { "id": "d", "text": "ローカルPCのハードドライブ（直接パス指定）" },
      { "id": "e", "text": "クエリ結果キャッシュ" }
    ],
    "correctOptionIds": ["a", "b"],
    "explanation": "`COPY INTO` コマンドは、Snowflake内部のステージまたはクラウドプロバイダー上の外部ステージにあるファイルからデータをロードします。ローカルファイルの場合は一度ステージにアップロード（PUT）する必要があります。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-load-overview"],
    "category": "Data Loading",
    "tags": ["Stages", "COPY INTO"]
  },
  {
    "id": "q7",
    "text": "Snowflakeのマイクロパーティションに自動的に保存されるメタデータ情報を2つ選択してください。",
    "options": [
      { "id": "a", "text": "各列の最小値と最大値" },
      { "id": "b", "text": "各列のNULL値の数" },
      { "id": "c", "text": "ユーザーのクエリ履歴" },
      { "id": "d", "text": "テーブルのインデックスツリー" },
      { "id": "e", "text": "アクセス権限リスト" }
    ],
    "correctOptionIds": ["a", "b"],
    "explanation": "クラウドサービス層は、各マイクロパーティションの範囲（最小値・最大値）、NULL数、個別値の数などの統計情報をメタデータとして保持し、これをクエリのプルーニング（不要な読み込みのスキップ）に使用します。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/tables-clustering-micropartitions"],
    "category": "Architecture",
    "tags": ["Micro-partitions", "Metadata"]
  },
  {
    "id": "q8",
    "text": "Snowflakeアカウントへのアクセスを保護するために推奨される認証・セキュリティ機能を2つ選択してください。",
    "options": [
      { "id": "a", "text": "多要素認証（MFA）" },
      { "id": "b", "text": "ネットワークポリシー（IP許可リスト）" },
      { "id": "c", "text": "データの圧縮解除" },
      { "id": "d", "text": "ウェアハウスの自動再開" },
      { "id": "e", "text": "Time Travelの無効化" }
    ],
    "correctOptionIds": ["a", "b"],
    "explanation": "アカウントアクセスを保護するためには、ユーザー認証を強化する「MFA」と、接続元のIPアドレスやVPCエンドポイントを制限する「ネットワークポリシー」の設定が主要なセキュリティ対策です。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/security-access-control-overview"],
    "category": "Security",
    "tags": ["MFA", "Network Policies"]
  },
  {
    "id": "q9",
    "text": "半構造化データ（JSONなど）をSnowflakeにロードまたはクエリする際に使用できる機能を2つ選択してください。",
    "options": [
      { "id": "a", "text": "VARIANTデータ型" },
      { "id": "b", "text": "FLATTEN関数" },
      { "id": "c", "text": "Micro-partitioning" },
      { "id": "d", "text": "Clustering Keys" },
      { "id": "e", "text": "Result Cache" }
    ],
    "correctOptionIds": ["a", "b"],
    "explanation": "半構造化データは「VARIANT」データ型に格納され、「FLATTEN」関数を使用してネストされた配列やオブジェクトを行に展開（フラット化）してクエリすることができます。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/querying-semistructured"],
    "category": "Data Types",
    "tags": ["Semi-structured Data", "VARIANT"]
  },
  {
    "id": "q10",
    "text": "データ共有（Secure Data Sharing）において、プロバイダーがコンシューマーと共有できるオブジェクトを2つ選択してください。",
    "options": [
      { "id": "a", "text": "テーブル" },
      { "id": "b", "text": "セキュアビュー" },
      { "id": "c", "text": "ユーザー" },
      { "id": "d", "text": "仮想ウェアハウス" },
      { "id": "e", "text": "ロール" }
    ],
    "correctOptionIds": ["a", "b"],
    "explanation": "データ共有では、データベース内の「テーブル」、「外部テーブル」、「セキュアビュー」、「セキュアUDF」などのデータオブジェクトを共有できます。ウェアハウスやユーザー、ロール自体は共有されません。",
    "urls": ["https://docs.snowflake.com/ja/user-guide/data-sharing-intro"],
    "category": "Data Sharing",
    "tags": ["Data Sharing", "Objects"]
  }
];