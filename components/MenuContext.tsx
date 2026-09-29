"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface MenuItem {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  badge?: string; // e.g. "Mais Vendido", "Vegano", "Picante", "Novo"
}

export interface MenuCategory {
  id: string;
  name: string;
}

export interface RestaurantInfo {
  logo?: string;
  name: string;
  phone: string;
  address: string;
  instagram: string;
  hours: string;
  description: string;
}

export interface MenuDesign {
  template: "minimalista" | "rustico" | "dark" | "retro" | "premium" | "moderno";
  colorPreset: "teal-terracotta" | "olive-cream" | "charcoal-gold" | "sunset-rose";
  fontFamily: "inter" | "serif" | "bebas";
  fontSize: "sm" | "md" | "lg";
  layoutType: "single" | "grid" | "sections";
  bgPattern?: string;
}

export interface MenuProject {
  id: string;
  name: string;
  restaurantInfo: RestaurantInfo;
  categories: MenuCategory[];
  items: MenuItem[];
  design: MenuDesign;
  status: "publicado" | "rascunho";
  createdAt: string;
  viewsCount: number;
  qrCodeUrl?: string;
}

interface MenuContextType {
  projects: MenuProject[];
  trash: MenuProject[];
  activeProject: MenuProject | null;
  setActiveProject: (project: MenuProject | null) => void;
  createProject: (name: string, templateType?: string, logo?: string) => MenuProject;
  updateProject: (id: string, updatedData: Partial<MenuProject>) => void;
  deleteProject: (id: string) => void;
  restoreProject: (id: string) => void;
  deletePermanently: (id: string) => void;
  restoreProjectBulk: (ids: string[]) => void;
  deletePermanentlyBulk: (ids: string[]) => void;
  deleteProjectBulk: (ids: string[]) => void;
  updateProjectStatusBulk: (ids: string[], status: "publicado" | "rascunho") => void;
  duplicateProject: (id: string) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  userProfile: { name: string; email: string; avatarInitials: string };
  updateUserProfile: (profile: Partial<{ name: string; email: string }>) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Default templates for mock data
export const DEFAULT_TEMPLATES: Record<string, {
  name: string;
  restaurantInfo: RestaurantInfo;
  categories: MenuCategory[];
  items: MenuItem[];
  design: MenuDesign;
}> = {
  cafeteria: {
    name: "Café Bistrô Grão & Prosa",
    restaurantInfo: {
      name: "Grão & Prosa",
      phone: "(11) 98765-4321",
      address: "Alameda das Flores, 142 - Pinheiros, São Paulo",
      instagram: "@graoeprosa",
      hours: "Terça a Domingo — 08:00 às 20:00",
      description: "Cafés especiais moídos na hora, brunch artesanal e doceria fina em um ambiente acolhedor no coração da cidade.",
      logo: "/logo-black.png"
    },
    categories: [
      { id: "cat-1", name: "Cafés Especiais" },
      { id: "cat-2", name: "Brunch & Salgados" },
      { id: "cat-3", name: "Doceria Fina" }
    ],
    items: [
      {
        id: "item-1",
        title: "Espresso Seleção",
        price: 8.50,
        description: "Grão 100% Arábica de origem controlada, notas sensoriais de chocolate meio amargo e caramelo.",
        category: "Cafés Especiais",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop",
        badge: "Clássico"
      },
      {
        id: "item-2",
        title: "Cappuccino Cremoso Italiano",
        price: 14.90,
        description: "Espresso duplo, leite vaporizado super cremoso e uma leve camada de cacau belga salpicado.",
        category: "Cafés Especiais",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop",
        badge: "Mais Vendido"
      },
      {
        id: "item-3",
        title: "Croissant de Frutas Vermelhas",
        price: 18.00,
        description: "Massa folhada francesa de fermentação natural, recheio de geleia artesanal de amora, framboesa e morango.",
        category: "Brunch & Salgados",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "item-4",
        title: "Toast de Cogumelos e Queijo Canastra",
        price: 24.50,
        description: "Pão de fermentação natural tostado na manteiga de ervas, mix de cogumelos salteados e queijo Canastra derretido.",
        category: "Brunch & Salgados",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop",
        badge: "Vegano"
      },
      {
        id: "item-5",
        title: "Torta de Limão Siciliano com Merengue",
        price: 16.00,
        description: "Massa sablée crocante, creme aveludado de limão siciliano e merengue suíço levemente tostado.",
        category: "Doceria Fina",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=600&auto=format&fit=crop"
      }
    ],
    design: {
      template: "premium" as const,
      colorPreset: "olive-cream" as const,
      fontFamily: "serif" as const,
      fontSize: "md" as const,
      layoutType: "grid" as const
    }
  },
  hamburgueria: {
    name: "Fogo & Brasa Hamburgueria Artesanal",
    restaurantInfo: {
      name: "Fogo & Brasa",
      phone: "(11) 99999-1234",
      address: "Rua Augusta, 1024 - Consolação, São Paulo",
      instagram: "@fogoebrasa.burguer",
      hours: "Quarta a Segunda — 18:00 às 23:30",
      description: "Burguers artesanais grelhados no fogo de verdade. Carne selecionada, pão brioche fresco e molhos autorais.",
      logo: "/logo-orance.svg"
    },
    categories: [
      { id: "cat-11", name: "Burguers na Grelha" },
      { id: "cat-12", name: "Acompanhamentos" },
      { id: "cat-13", name: "Bebidas & Shakes" }
    ],
    items: [
      {
        id: "item-11",
        title: "Defumado Cheddar Burguer",
        price: 36.90,
        description: "Blend de 160g de Angus grelhado no fogo, muito queijo cheddar inglês derretido, cebola caramelizada no whisky e bacon crocante.",
        category: "Burguers na Grelha",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
        badge: "O Favorito"
      },
      {
        id: "item-12",
        title: "Brasa Burger Clássico",
        price: 32.00,
        description: "Blend de 160g, queijo prato artesanal, alface americana fresca, tomate caipira, picles da casa e maionese defumada no pão brioche.",
        category: "Burguers na Grelha",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "item-13",
        title: "Batatas Rústicas com Ervas e Páprica",
        price: 18.00,
        description: "Batatas fritas com casca cortadas em canoa, temperadas com sal marinho, alecrim fresco e páprica defumada. Acompanha maionese verde.",
        category: "Acompanhamentos",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600&auto=format&fit=crop",
        badge: "Picante"
      },
      {
        id: "item-14",
        title: "Milkshake de Doce de Leite com Canela",
        price: 22.00,
        description: "Sorvete artesanal de creme batido com doce de leite premium, chantilly fresco e um toque sutil de canela em pó.",
        category: "Bebidas & Shakes",
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600&auto=format&fit=crop"
      }
    ],
    design: {
      template: "retro" as const,
      colorPreset: "teal-terracotta" as const,
      fontFamily: "bebas" as const,
      fontSize: "lg" as const,
      layoutType: "grid" as const
    }
  },
  sushi: {
    name: "Sakura Premium Sushi & Lounge",
    restaurantInfo: {
      name: "Sakura Lounge",
      phone: "(11) 97777-5678",
      address: "Av. Brigadeiro Luís Antônio, 2800 - Jardim Paulista, São Paulo",
      instagram: "@sakurapremium.sushi",
      hours: "Todos os dias — 19:00 às 00:00",
      description: "Gastronomia oriental contemporânea. Peixes frescos selecionados diariamente, cortes tradicionais e drinks exclusivos.",
      logo: "/logo-black.png"
    },
    categories: [
      { id: "cat-21", name: "Entradas Frias" },
      { id: "cat-22", name: "Combinados Especiais" },
      { id: "cat-23", name: "Sashimi & Temaki" }
    ],
    items: [
      {
        id: "item-21",
        title: "Carpaccio de Salmão Trufado",
        price: 49.00,
        description: "16 fatias finas de salmão fresco, azeite trufado, raspas de limão siciliano, flor de sal e molho ponzu autoral.",
        category: "Entradas Frias",
        image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=600&auto=format&fit=crop",
        badge: "Chef's Choice"
      },
      {
        id: "item-22",
        title: "Combinado Sakura (20 Peças)",
        price: 89.00,
        description: "5 Sashimis de Salmão, 5 Niguiris de Atum com Selo Premium, 4 Uramaki Filadélfia, 4 Hossomaki de Kani e 2 Dyo de Salmão com Maracujá.",
        category: "Combinados Especiais",
        image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=600&auto=format&fit=crop",
        badge: "Premium"
      },
      {
        id: "item-23",
        title: "Temaki Salmão Completo Grelhado",
        price: 28.90,
        description: "Cone de alga crocante recheado com salmão grelhado na chapa, cream cheese philadelphia de verdade e cebolinha fresca.",
        category: "Sashimi & Temaki",
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=600&auto=format&fit=crop"
      }
    ],
    design: {
      template: "dark" as const,
      colorPreset: "charcoal-gold" as const,
      fontFamily: "inter" as const,
      fontSize: "sm" as const,
      layoutType: "single" as const
    }
  },
  pizzaria: {
    name: "Bella Italia Pizzaria Artesanal",
    restaurantInfo: {
      name: "Bella Italia",
      phone: "(11) 98888-4321",
      address: "Rua das Oliveiras, 450 - Bixiga, São Paulo",
      instagram: "@bellaitalia.pizzaria",
      hours: "Terça a Domingo — 18:00 às 23:00",
      description: "Pizzas de fermentação lenta com farinha italiana 00, molho de tomate San Marzano e ingredientes selecionados assados em forno a lenha.",
      logo: "/logo-black.png"
    },
    categories: [
      { id: "cat-31", name: "Pizzas Especiais" },
      { id: "cat-32", name: "Sobremesas" }
    ],
    items: [
      {
        id: "item-31",
        title: "Pizza Margherita D.O.C.",
        price: 52.00,
        description: "Molho de tomate San Marzano, muçarela de búfala fresca, manjericão gigante e azeite extravirgem.",
        category: "Pizzas Especiais",
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600&auto=format&fit=crop",
        badge: "Clássica"
      },
      {
        id: "item-32",
        title: "Pizza Calabresa Artesanal",
        price: 54.00,
        description: "Molho de tomate, muçarela, calabresa artesanal defumada com cebola roxa e azeitonas pretas.",
        category: "Pizzas Especiais",
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600&auto=format&fit=crop",
        badge: "Mais Vendida"
      },
      {
        id: "item-33",
        title: "Pizza de Chocolate Premium",
        price: 46.00,
        description: "Base crocante coberta com chocolate belga ao leite e morangos frescos picados.",
        category: "Sobremesas",
        image: "/comidas/pizza-chocolate.png",
        badge: "Deliciosa"
      }
    ],
    design: {
      template: "rustico" as const,
      colorPreset: "teal-terracotta" as const,
      fontFamily: "serif" as const,
      fontSize: "md" as const,
      layoutType: "grid" as const
    }
  },
  doceria: {
    name: "Ateliê do Doce Gourmet",
    restaurantInfo: {
      name: "Ateliê do Doce",
      phone: "(11) 97777-8888",
      address: "Alameda Lorena, 1500 - Jardins, São Paulo",
      instagram: "@ateliedodoce.gourmet",
      hours: "Quarta a Domingo — 11:00 às 19:00",
      description: "Confeitaria artesanal sofisticada, macarons franceses, tortas autorais sob encomenda e doces finos para paladares exigentes.",
      logo: "/logo-black.png"
    },
    categories: [
      { id: "cat-41", name: "Doces Finos" },
      { id: "cat-42", name: "Bebidas" }
    ],
    items: [
      {
        id: "item-41",
        title: "Macaron Seleção (6 unidades)",
        price: 36.00,
        description: "Caixa com mix de sabores tradicionais franceses: pistache, framboesa, baunilha de Madagascar e caramelo salgado.",
        category: "Doces Finos",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop",
        badge: "Destaque"
      },
      {
        id: "item-42",
        title: "Mil Folhas de Baunilha",
        price: 18.50,
        description: "Massa folhada caramelizada crocante intercalada com creme pâtissière suave de baunilha.",
        category: "Doces Finos",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop",
        badge: "Destaque"
      }
    ],
    design: {
      template: "minimalista" as const,
      colorPreset: "sunset-rose" as const,
      fontFamily: "inter" as const,
      fontSize: "sm" as const,
      layoutType: "single" as const
    }
  }
};

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<MenuProject[]>([]);
  const [trash, setTrash] = useState<MenuProject[]>([]);
  const [activeProject, setActiveProject] = useState<MenuProject | null>(null);
  const [darkMode, setDarkModeState] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name: string; email: string; avatarInitials: string }>({
    name: "Grão & Prosa",
    email: "contato@restaurante.com.br",
    avatarInitials: "GP",
  });

  // Load from localStorage on client mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("smartmenu_projects");
    const savedTrash = localStorage.getItem("smartmenu_trash");

    const doceriaProj: MenuProject = {
      id: "proj-5",
      name: "Cardápio Ateliê Pastel Doce",
      restaurantInfo: {
        ...DEFAULT_TEMPLATES.doceria.restaurantInfo,
        name: "Ateliê Pastel Doce",
      },
      categories: DEFAULT_TEMPLATES.doceria.categories,
      items: DEFAULT_TEMPLATES.doceria.items,
      design: DEFAULT_TEMPLATES.doceria.design,
      status: "publicado",
      createdAt: new Date().toLocaleDateString("pt-BR"),
      viewsCount: 1850,
    };

    const pizzariaProj: MenuProject = {
      id: "proj-4",
      name: "Cardápio Bella Italia Pizzaria",
      restaurantInfo: DEFAULT_TEMPLATES.pizzaria.restaurantInfo,
      categories: DEFAULT_TEMPLATES.pizzaria.categories,
      items: DEFAULT_TEMPLATES.pizzaria.items,
      design: DEFAULT_TEMPLATES.pizzaria.design,
      status: "publicado",
      createdAt: new Date().toLocaleDateString("pt-BR"),
      viewsCount: 2950,
    };

    let projectsList: MenuProject[] = [];

    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects) as MenuProject[];
        // Filter to keep specified projects, templates and copy versions
        projectsList = parsed.filter(
          (p) =>
            p.id === doceriaProj.id ||
            p.id === pizzariaProj.id ||
            p.name.includes("Ateliê Pastel Doce") ||
            p.name.includes("Bella Italia") ||
            p.name.includes("Pizzaria") ||
            p.name.includes("Tokyo Noir Dark") ||
            p.name.includes("Retro Burger Shop") ||
            p.name.includes("Cafeteria Editorial") ||
            p.name.includes("Cantina Rústica")
        );

        // Always sync/update projects to use latest items and images
        projectsList = projectsList.map((p) => {
          if (p.name.includes("Pastel Doce") || p.name.includes("Doceria")) {
            return {
              ...p,
              restaurantInfo: {
                ...DEFAULT_TEMPLATES.doceria.restaurantInfo,
                name: "Ateliê Pastel Doce",
              },
              categories: DEFAULT_TEMPLATES.doceria.categories,
              items: DEFAULT_TEMPLATES.doceria.items,
            };
          }
          if (p.name.includes("Bella Italia") || p.name.includes("Pizzaria") || p.name.includes("Cantina Rústica")) {
            return {
              ...p,
              categories: DEFAULT_TEMPLATES.pizzaria.categories,
              items: DEFAULT_TEMPLATES.pizzaria.items,
            };
          }
          if (p.name.includes("Cafeteria") || p.name.includes("Café")) {
            return {
              ...p,
              categories: DEFAULT_TEMPLATES.cafeteria.categories,
              items: DEFAULT_TEMPLATES.cafeteria.items,
            };
          }
          if (p.name.includes("Burger") || p.name.includes("Burguer") || p.name.includes("Brasa")) {
            return {
              ...p,
              categories: DEFAULT_TEMPLATES.hamburgueria.categories,
              items: DEFAULT_TEMPLATES.hamburgueria.items,
            };
          }
          if (p.name.includes("Sakura") || p.name.includes("Sushi") || p.name.includes("Tokyo")) {
            return {
              ...p,
              categories: DEFAULT_TEMPLATES.sushi.categories,
              items: DEFAULT_TEMPLATES.sushi.items,
            };
          }
          return p;
        });
      } catch (e) {
        projectsList = [];
      }
    }

    // Ensure both projects exist in the list by checking ID
    if (!projectsList.some((p) => p.id === doceriaProj.id)) {
      projectsList.push(doceriaProj);
    }
    if (!projectsList.some((p) => p.id === pizzariaProj.id)) {
      projectsList.push(pizzariaProj);
    }

    // Deduplicate by ID to prevent duplicate key console errors
    const uniqueMap = new Map<string, MenuProject>();
    projectsList.forEach((p) => {
      uniqueMap.set(p.id, p);
    });
    projectsList = Array.from(uniqueMap.values());

    // Save cleaned up list and update state
    setProjects(projectsList);
    localStorage.setItem("smartmenu_projects", JSON.stringify(projectsList));

    if (savedTrash) {
      setTrash(JSON.parse(savedTrash));
    }

    const savedUser = localStorage.getItem("smartmenu_user");
    if (savedUser) {
      try {
        setUserProfile(JSON.parse(savedUser));
      } catch (e) {}
    }

    const isDark = localStorage.getItem("smartmenu_dark") === "true";
    setDarkModeState(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const setDarkMode = (value: boolean) => {
    setDarkModeState(value);
    localStorage.setItem("smartmenu_dark", String(value));
    if (value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const updateUserProfile = (profile: Partial<{ name: string; email: string }>) => {
    setUserProfile((prev) => {
      const merged = { ...prev, ...profile };
      if (profile.name) {
        const parts = profile.name.trim().split(/\s+/);
        let initials = "";
        if (parts.length > 0 && parts[0]) {
          initials += parts[0][0];
        }
        if (parts.length > 1 && parts[parts.length - 1]) {
          initials += parts[parts.length - 1][0];
        } else if (parts[0] && parts[0].length > 1) {
          initials += parts[0][1];
        }
        merged.avatarInitials = initials.toUpperCase() || "GP";
      }
      localStorage.setItem("smartmenu_user", JSON.stringify(merged));
      return merged;
    });
  };

  // Save projects helper
  const saveProjectsToLocalStorage = (newProjects: MenuProject[]) => {
    setProjects(newProjects);
    localStorage.setItem("smartmenu_projects", JSON.stringify(newProjects));
  };

  // Save trash helper
  const saveTrashToLocalStorage = (newTrash: MenuProject[]) => {
    setTrash(newTrash);
    localStorage.setItem("smartmenu_trash", JSON.stringify(newTrash));
  };

  // Create Project
  const createProject = (name: string, templateType?: string, logo?: string) => {
    let baseTemplate = DEFAULT_TEMPLATES.cafeteria; // fallback

    if (templateType === "hamburgueria") {
      baseTemplate = DEFAULT_TEMPLATES.hamburgueria;
    } else if (templateType === "sushi") {
      baseTemplate = DEFAULT_TEMPLATES.sushi;
    } else if (templateType === "pizzaria") {
      baseTemplate = DEFAULT_TEMPLATES.pizzaria;
    } else if (templateType === "doceria") {
      baseTemplate = DEFAULT_TEMPLATES.doceria;
    }

    const newProject: MenuProject = {
      id: `proj-${Date.now()}`,
      name: name || `Cardápio ${baseTemplate.restaurantInfo.name}`,
      restaurantInfo: {
        ...baseTemplate.restaurantInfo,
        name: name || baseTemplate.restaurantInfo.name,
        logo: logo || baseTemplate.restaurantInfo.logo || undefined
      },
      categories: [...baseTemplate.categories],
      items: [...baseTemplate.items],
      design: { ...baseTemplate.design },
      status: "rascunho",
      createdAt: new Date().toLocaleDateString("pt-BR"),
      viewsCount: 0
    };

    const updatedProjects = [newProject, ...projects];
    saveProjectsToLocalStorage(updatedProjects);
    return newProject;
  };

  // Update Project
  const updateProject = (id: string, updatedData: Partial<MenuProject>) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === id) {
        const merged = { ...p, ...updatedData };
        // If we update activeProject, keep it in sync
        if (activeProject && activeProject.id === id) {
          setActiveProject(merged);
        }
        return merged;
      }
      return p;
    });
    saveProjectsToLocalStorage(updatedProjects);
  };

  // Move to trash
  const deleteProject = (id: string) => {
    const projectToDelete = projects.find((p) => p.id === id);
    if (!projectToDelete) return;

    // Remove from projects
    const updatedProjects = projects.filter((p) => p.id !== id);
    saveProjectsToLocalStorage(updatedProjects);

    // Add to trash
    const updatedTrash = [projectToDelete, ...trash];
    saveTrashToLocalStorage(updatedTrash);

    if (activeProject && activeProject.id === id) {
      setActiveProject(null);
    }
  };

  // Restore from trash
  const restoreProject = (id: string) => {
    const projectToRestore = trash.find((p) => p.id === id);
    if (!projectToRestore) return;

    // Remove from trash
    const updatedTrash = trash.filter((p) => p.id !== id);
    saveTrashToLocalStorage(updatedTrash);

    // Add back to active projects
    const updatedProjects = [projectToRestore, ...projects];
    saveProjectsToLocalStorage(updatedProjects);
  };

  // Delete permanently from trash
  const deletePermanently = (id: string) => {
    const updatedTrash = trash.filter((p) => p.id !== id);
    saveTrashToLocalStorage(updatedTrash);
  };

  // Restore bulk from trash
  const restoreProjectBulk = (ids: string[]) => {
    const projectsToRestore = trash.filter((p) => ids.includes(p.id));
    if (projectsToRestore.length === 0) return;

    // Remove from trash
    const updatedTrash = trash.filter((p) => !ids.includes(p.id));
    saveTrashToLocalStorage(updatedTrash);

    // Add back to active projects
    const updatedProjects = [...projectsToRestore, ...projects];
    saveProjectsToLocalStorage(updatedProjects);
  };

  // Delete permanently bulk from trash
  const deletePermanentlyBulk = (ids: string[]) => {
    const updatedTrash = trash.filter((p) => !ids.includes(p.id));
    saveTrashToLocalStorage(updatedTrash);
  };

  // Delete project bulk (move to trash)
  const deleteProjectBulk = (ids: string[]) => {
    const projectsToDelete = projects.filter((p) => ids.includes(p.id));
    if (projectsToDelete.length === 0) return;

    // Remove from active projects
    const updatedProjects = projects.filter((p) => !ids.includes(p.id));
    saveProjectsToLocalStorage(updatedProjects);

    // Add to trash
    const updatedTrash = [...projectsToDelete, ...trash];
    saveTrashToLocalStorage(updatedTrash);

    if (activeProject && ids.includes(activeProject.id)) {
      setActiveProject(null);
    }
  };

  // Update project status bulk
  const updateProjectStatusBulk = (ids: string[], status: "publicado" | "rascunho") => {
    const updatedProjects = projects.map((p) => {
      if (ids.includes(p.id)) {
        const merged = { ...p, status };
        if (activeProject && activeProject.id === p.id) {
          setActiveProject(merged);
        }
        return merged;
      }
      return p;
    });
    saveProjectsToLocalStorage(updatedProjects);
  };

  // Duplicate Project
  const duplicateProject = (id: string) => {
    const projectToDup = projects.find((p) => p.id === id);
    if (!projectToDup) return;

    const duplicated: MenuProject = {
      ...projectToDup,
      id: `proj-${Date.now()}`,
      name: `${projectToDup.name} (Cópia)`,
      createdAt: new Date().toLocaleDateString("pt-BR"),
      viewsCount: 0,
      status: "rascunho"
    };

    const updatedProjects = [duplicated, ...projects];
    saveProjectsToLocalStorage(updatedProjects);
  };

  return (
    <MenuContext.Provider
      value={{
        projects,
        trash,
        activeProject,
        setActiveProject,
        createProject,
        updateProject,
        deleteProject,
        restoreProject,
        deletePermanently,
        restoreProjectBulk,
        deletePermanentlyBulk,
        deleteProjectBulk,
        updateProjectStatusBulk,
        duplicateProject,
        darkMode,
        setDarkMode,
        userProfile,
        updateUserProfile,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu deve ser usado dentro de um MenuProvider");
  }
  return context;
};
