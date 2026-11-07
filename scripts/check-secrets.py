"""Controllo euristico locale: emette solo tipo, percorso e riga, mai valori."""
import argparse, json, pathlib, re, subprocess
parser=argparse.ArgumentParser()
parser.add_argument('roots',nargs='+')
parser.add_argument('--output',default='reports/secret-scan.json')
parser.add_argument('--fail-on-candidates',action='store_true')
args=parser.parse_args()
patterns={
 'private-key':re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----'),
 'github-token':re.compile(r'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})\b'),
 'provider-key':re.compile(r'\b(?:sk_(?:live|test)_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9_-]{24,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35})\b'),
 'connection-credentials':re.compile(r'(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis)://[^\s:/@]+:[^\s/@]{6,}@'),
 'assigned-sensitive-value':re.compile(r'''(?i)(?:api[_-]?key|auth[_-]?token|access[_-]?token|client[_-]?secret|password)\s*[:=]\s*["'][^"'\n]{12,}["']'''),
}
skip={'node_modules','.git','.next','.expo','.venv','venv','vendor','dist','build','coverage','.turbo','.cache','output','reports','marketing-assets','backups','backup','sito mio'}
exts={'.ts','.tsx','.js','.jsx','.mjs','.cjs','.json','.yml','.yaml','.toml','.py','.php','.sh','.swift','.md','.html','.css','.prisma','.sql','.txt'}
items=[]; restricted=[]; checked=0
for raw in args.roots:
 root=pathlib.Path(raw)
 for base,dirs,files in __import__('os').walk(root,followlinks=False):
  dirs[:]=[d for d in dirs if d not in skip and not d.startswith('.') and 'backup' not in d.lower() and not pathlib.Path(base,d).is_symlink()]
  for name in files:
   p=pathlib.Path(base,name)
   if p.is_symlink():continue
   if name.startswith('.env') and name!='.env.example' or re.match(r'(?i)(ACCESSO|CREDENZIALI|PASSWORD)',name) or p.suffix.lower() in {'.db','.sqlite','.sqlite3','.dump','.pem','.key','.p12','.pfx'}:
    restricted.append(str(p));continue
   if p.suffix.lower() not in exts or p.stat().st_size>750000 or name.endswith(('-lock.json','.min.js')):continue
   try:content=p.read_text(errors='replace')
   except OSError:continue
   checked+=1
   for n,line in enumerate(content.splitlines(),1):
    for kind,pattern in patterns.items():
     if pattern.search(line):
      if any(x in line.lower() for x in ['example.invalid','placeholder','your_','your-','change_me','changeme','dummy','process.env','os.getenv','import.meta.env','\u2026']):continue
      items.append({'path':str(p),'line':n,'type':kind,'status':'candidate-needs-local-review'})
result={'method':'heuristic-redacted-no-live-validation','files_scanned':checked,'candidates':items,'restricted_paths_not_read':restricted,'limitations':['Regex non esaustive, falsi positivi possibili.','File sensibili individuati per nome e non letti.','Cronologie originali non bonificate: pubblicazione degli originali non autorizzata.']}
out=pathlib.Path(args.output);out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(json.dumps({'files_scanned':checked,'candidate_count':len(items),'restricted_count':len(restricted),'output':str(out)}))

if args.fail_on_candidates and (items or restricted):
 raise SystemExit(1)
