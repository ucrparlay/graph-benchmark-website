import subprocess
import re

def run_bcc(pasgal_repo_path, graph_path):
    last_line = None
    last_2_line = None
    last_3_line = None
    p = subprocess.Popen(f'cd {pasgal_repo_path}/src/BCC && ./fast-bcc -s -i {graph_path}', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for line in p.stdout.readlines():
        last_3_line = last_2_line
        last_2_line = last_line
        last_line = line.decode("utf-8")
    p.wait()

    bcc_count = re.findall(r'\d+', last_3_line)
    largest_bcc_size = re.findall(r'\d+', last_2_line)
    
    if not bcc_count and not largest_bcc_size:
        raise Exception("BCC script did not print numbers") 
    
    return int(bcc_count[0]), int(largest_bcc_size[0])