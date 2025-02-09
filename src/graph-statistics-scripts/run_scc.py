import subprocess
import re

def run_scc(pasgal_repo_path, graph_path):
    last_line = None
    last_2_line = None
    last_3_line = None
    p = subprocess.Popen(f'cd {pasgal_repo_path}/src/SCC && ./scc -i {graph_path}', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for line in p.stdout.readlines():
        last_3_line = last_2_line
        last_2_line = last_line
        last_line = line.decode("utf-8")
    p.wait()

    scc_count = re.findall(r'\d+', last_2_line)
    largest_scc = re.findall(r'\d+', last_line)
    
    if not scc_count and not largest_scc:
        raise Exception("BCC script did not print numbers") 
    
    return int(scc_count[0]), int(largest_scc[0])