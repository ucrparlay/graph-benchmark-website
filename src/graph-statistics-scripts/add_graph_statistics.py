import argparse
import sys
import os
import subprocess
import json

from run_bcc import run_bcc
from run_scc import run_scc
from run_basic_analytics import run_basic_analytics

repo_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
parent_dir = os.path.dirname(repo_dir)

parser = argparse.ArgumentParser(
    prog='graph_statistics',
    description='Program to generate the statisctics of the graph')

parser.add_argument('-j', '--json_file', help='The path to the metadata json file', required=True)
parser.add_argument('-g', '--graph_key', help='The key of the graph in the metadata json file. Runs for all the graphs if not provided')
parser.add_argument('-f', '--graph_folder', help='the directory where the graph files are present. Defaults to "/ssd0/graphs".', default="/ssd0/graphs")
parser.add_argument('-p', '--pasgal_repo_path', help='The path to the PASGAL repository in this machine. If the path doesnot exist, the script tries to download the repo onto this path. If this parameter is missing, it defaults to the parent directory of this repo.', default=parent_dir+"/PASGAL")

args = parser.parse_args(sys.argv[1:])

if not os.path.isdir(args.pasgal_repo_path):
    print("PASGAL repo not found")
    pasgal_repo_parent = os.path.dirname(args.pasgal_repo_path)
    p = subprocess.Popen(f'cd {pasgal_repo_parent} && git clone https://github.com/ucrparlay/PASGAL.git', shell=True)

print("*"*30)
print("Running make on basic analytics")
p = subprocess.Popen(f'cd {args.pasgal_repo_path}/src/basic_analytics && make', shell=True)
p.wait()

print("*"*30)
print("Running make on BCC")
p = subprocess.Popen(f'cd {args.pasgal_repo_path}/src/BCC && make', shell=True)
p.wait()

print("*"*30)
print("Running make on SCC")
p = subprocess.Popen(f'cd {args.pasgal_repo_path}/src/SCC && make', shell=True)
p.wait()

try:
    with open(args.json_file, 'r') as file:
        graphs = json.load(file)
except:
    print("Unable to read the JSON file")
    exit()

for graph_key in graphs:
    if args.graph_key == None or args.graph_key == graph_key:
        print("*"*30)
        print(f'Running for: {graph_key}')
        graph_metadata = graphs[graph_key]
        graph_path = args.graph_folder + "/" + graph_metadata["path"]

        try:
            basic_stats = run_basic_analytics(args.pasgal_repo_path, graph_path)
            graph_metadata["vertices_count"] = basic_stats["vertices_count"]
            graph_metadata["edges_count"] = basic_stats["edges_count"]

            n = basic_stats["vertices_count"]
            m = basic_stats["edges_count"]

            graph_metadata["density"] = m / (n * (n-1))
            graph_metadata["avg_degree"] = m / n
           
            graph_metadata["max_out_degree"] = basic_stats["max_out_degree"]
            graph_metadata["min_out_degree"] = basic_stats["min_out_degree"]
            graph_metadata["zero_out_degree_count"] = basic_stats["zero_out_degree_count"]
            graph_metadata["max_in_degree"] = basic_stats["max_in_degree"]
            graph_metadata["min_in_degree"] = basic_stats["min_in_degree"]
            graph_metadata["zero_in_degree_count"] = basic_stats["zero_in_degree_count"]

        except Exception as e:
            print("Error: ", e)
            continue

        if graph_metadata["symmetric"] == True:
            try:
                bcc_count, largest_bcc_size = run_bcc(args.pasgal_repo_path, graph_path)
                graph_metadata["bcc_count"] = bcc_count
                graph_metadata["largest_bcc_size"] = largest_bcc_size
            except Exception as e:
                print("Error: ", e)
                continue
        else:
            graph_metadata["bcc_count"] = "-"
            graph_metadata["largest_bcc_size"] = "-"
        
        try:
            scc_count, largest_scc_size = run_scc(args.pasgal_repo_path, graph_path)
            graph_metadata["scc_count"] = scc_count
            graph_metadata["largest_scc_size"] = largest_scc_size
        except Exception as e:
            print("Error: ", e)
            continue

print("*"*30)        
try:
    with open(args.json_file, "w") as file:
        json.dump(graphs, file, indent=2)
except:
    print(f'Error writing back to the JSON file')

print(f"Done saving into the JSON file")