import subprocess
import re
import json

def run_basic_analytics(repo_path, graph_path):
    last_line = None
    last_2_line = None
    last_3_line = None
    p = subprocess.Popen(f'cd {repo_path}/src/basic_analytics && ./basic_analytics -s -i {graph_path} -j', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for line in p.stdout.readlines():
        last_3_line = last_2_line
        last_2_line = last_line
        last_line = line.decode("utf-8")
    p.wait()

    stats = json.loads(last_line)
    return stats